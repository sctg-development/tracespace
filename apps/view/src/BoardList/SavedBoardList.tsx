import React from "react";

import { stopPropagation } from "../events";
import { BoardSummary } from "../types";
import BoardItem from "./BoardItem";

type Props = {
  selectedId: string | null;
  boards: Array<BoardSummary>;
  onItemClick: (id: string) => void;
};

export default function SavedBoardList(props: Props): JSX.Element {
  const { selectedId, boards, onItemClick } = props;

  return (
    <div className="absolute right-0 top-28 bottom-20 w-1/3 overflow-hidden">
      <div
        onWheel={stopPropagation}
        className="w-full max-h-full px-4 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#fff_transparent]"
      >
        <ul className="list-none mt-1 mb-0 pl-0 text-neutral-950">
          {boards.map((board) => (
            <BoardItem
              {...board}
              key={board.id}
              selected={board.id === selectedId}
              onClick={onItemClick}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
