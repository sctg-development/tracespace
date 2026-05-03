import * as State from './state'
import {
  createAppDatabase,
  ensureAppPreferences,
  updateAppPreferences,
  AppDatabase,
} from './db'

export function createSettingsMiddleware(useStorage = false): State.Middleware {
  let database: AppDatabase | undefined

  return (store) => {
    const {dispatch} = store

    if (useStorage) {
      createAppDatabase().then((db) => {
        database = db
        dispatch(State.fetchAppPreferences())
      })
    }

    return (next) => (action) => {
      if (useStorage && database) {
        const db: AppDatabase = database

        switch (action.type) {
          case State.FETCH_APP_PREFERENCES: {
            ensureAppPreferences(db).then((prefs) =>
              dispatch(State.appPreferences(prefs))
            )
            break
          }

          case State.UPDATE_APP_PREFERENCES: {
            updateAppPreferences(db, action.payload)
              .then(() => ensureAppPreferences(db))
              .then((prefs) => dispatch(State.appPreferences(prefs)))
            break
          }
        }
      } else if (!useStorage) {
        // When useStorage is false, handle preferences updates in-memory only
        switch (action.type) {
          case State.UPDATE_APP_PREFERENCES: {
            dispatch(State.appPreferences(action.payload))
            break
          }
        }
      }

      return next(action)
    }
  }
}
