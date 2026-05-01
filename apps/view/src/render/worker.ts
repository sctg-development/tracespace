import {
  createBoardDatabase,
  saveBoard,
  getBoard,
  getBoards,
  findBoardByUrl,
  deleteBoard,
  deleteAllBoards,
  BoardDatabase,
} from '../db'

import {RenderWorkerContext, WorkerMessageEvent} from './types'

import {
  Action,
  CREATE_BOARD,
  CREATE_BOARD_FROM_URL,
  GET_BOARD,
  GET_BOARD_PACKAGE,
  UPDATE_BOARD,
  DELETE_BOARD,
  DELETE_ALL_BOARDS,
  boardRendered,
  boardUpdated,
  boardDeleted,
  boardPackaged,
  allBoardsDeleted,
  workerInitialized,
  workerErrored,
} from '../state'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ctx: RenderWorkerContext = self as any
let db: BoardDatabase

// Polyfill process.nextTick for dependencies that use it in Web Workers
if (typeof (globalThis as any).process === 'undefined') {
  ;(globalThis as any).process = {}
}
if (typeof (globalThis as any).process.nextTick !== 'function') {
  ;(globalThis as any).process.nextTick = (fn: () => void) =>
    Promise.resolve().then(fn)
}

// Models will be loaded dynamically to avoid CommonJS interop issues with Web Workers
let models: any

// Send diagnostic message to confirm worker script is executing
ctx.postMessage({type: 'WORKER_DEBUG', payload: 'Worker script started'} as any)

// Initialize worker: load models and database
Promise.all([
  import('./models').then((m) => {
    models = m
    console.log('[Worker] Models loaded')
  }),
  createBoardDatabase().then((database) => {
    db = database
    console.log('[Worker] Database created')
  }),
])
  .then(() => getBoards(db))
  .then((boards) => {
    console.log('[Worker] Initialized with boards:', boards.length)
    ctx.postMessage(workerInitialized(boards))
  })
  .catch((error) => {
    console.error('[Worker] Initialization error:', error)
    ctx.postMessage(
      workerErrored(
        {type: 'FETCH_APP_PREFERENCES'} as unknown as Action,
        error as Error
      )
    )
  })

const duration = (start: number): number => Date.now() - start

ctx.onmessage = function receive(event) {
  const request = event.data
  const startTime = Date.now()
  let response

  console.log('[Worker] Received message:', request.type, 'payload' in request ? request.payload : undefined)

  switch (request.type) {
    case CREATE_BOARD_FROM_URL: {
      const url = (request as any).payload
      console.log('[Worker] Processing CREATE_BOARD_FROM_URL with URL:', url)

      response = Promise.all([
        findBoardByUrl(db, url),
        models.urlToStackups(url),
      ]).then(async (result) => {
        console.log('[Worker] urlToStackups completed, processing results')
        const [existingBoard, [selfContained, shared]] = result
        console.log(
          '[Worker] Stackup layers:',
          Object.keys(selfContained.layers).length
        )
        let board = models.stackupToBoard(selfContained)
        console.log(
          '[Worker] Board created with layers:',
          Object.keys(board.layers).length
        )
        let saveQuery

        board.sourceUrl = url

        if (!existingBoard) {
          const render = models.stackupToBoardRender(shared, board)

          ctx.postMessage(boardRendered(render, duration(startTime)))
          saveQuery = saveBoard(db, board)
        } else {
          board = models.updateBoard(board, existingBoard)
          saveQuery = models.boardToStackups(board).then((stackups: any) => {
            const [selfContained, shared] = stackups
            const render = models.stackupToBoardRender(shared, board)

            board = models.updateBoardThumbnail(board, selfContained)
            ctx.postMessage(boardRendered(render, duration(startTime)))

            return saveBoard(db, board)
          })
        }

        return saveQuery.then(() => ctx.postMessage(boardUpdated(board)))
      })

      break
    }

    case CREATE_BOARD: {
      const files = request.payload

      response = models.filesToStackups(files).then(async (stackups: any) => {
        const [selfContained, shared] = stackups
        const board = models.stackupToBoard(selfContained)
        const render = models.stackupToBoardRender(shared, board)

        ctx.postMessage(boardRendered(render, duration(startTime)))

        return saveBoard(db, board).then(() =>
          ctx.postMessage(boardUpdated(board))
        )
      })

      break
    }

    case GET_BOARD: {
      const id = request.payload

      response = getBoard(db, id).then(async (board) =>
        models.boardToStackups(board).then((stackups: any) => {
          const [, shared] = stackups
          const render = models.stackupToBoardRender(shared, board)
          ctx.postMessage(boardRendered(render, duration(startTime)))
        })
      )

      break
    }

    case GET_BOARD_PACKAGE: {
      const id = request.payload

      response = getBoard(db, id).then(async (board) =>
        models
          .boardToStackups(board)
          .then((stackups: any) => {
            const [selfContained] = stackups
            return models.stackupToZipBlob(selfContained)
          })
          .then((blob: any) => ctx.postMessage(boardPackaged(id, board.name, blob)))
      )

      break
    }

    case UPDATE_BOARD: {
      const {id, update} = request.payload

      response = getBoard(db, id).then(async (prevBoard) => {
        const board = models.updateBoard(prevBoard, update)

        return models.boardToStackups(board).then(async (stackups: any) => {
          const [selfContained, shared] = stackups
          const render = models.stackupToBoardRender(shared, board)
          const nextBoard = models.updateBoardThumbnail(board, selfContained)

          ctx.postMessage(boardRendered(render, duration(startTime)))

          return saveBoard(db, nextBoard).then(() =>
            ctx.postMessage(
              boardUpdated({
                id: nextBoard.id,
                name: nextBoard.name,
                options: nextBoard.options,
                thumbnail: nextBoard.thumbnail,
              })
            )
          )
        })
      })
      break
    }

    case DELETE_BOARD: {
      const id = request.payload

      response = deleteBoard(db, id).then(() =>
        ctx.postMessage(boardDeleted(id))
      )
      break
    }

    case DELETE_ALL_BOARDS: {
      response = deleteAllBoards(db).then(() =>
        ctx.postMessage(allBoardsDeleted())
      )
      break
    }
  }

  if (response) {
    response.catch((e: Error) => ctx.postMessage(workerErrored(request, e)))
  }
}

declare module './worker' {
  export default class RenderWorker extends Worker {
    constructor()
    onmessage: (event: WorkerMessageEvent) => void
    postMessage(message: Action): void
  }
}
