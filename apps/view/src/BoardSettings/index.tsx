import React, { useState, useRef, useEffect } from "react";

import { stopPropagation } from "../events";
import { BoardRender } from "../types";
import { Button, Icon, Fade } from "../ui";
import { BoardName } from "./name";
import ModeSelect from "./ModeSelect";
import SettingsForm from "./SettingsForm";

export type BoardSettingsProps = {
  board: BoardRender;
  updating: boolean;
};

const OPEN_BUTTON_TOOLTIP = "Board settings";

export default function BoardSettings(props: BoardSettingsProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const modalContentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const $modalContents = modalContentsRef.current;

    if ($modalContents) {
      const { width } = $modalContents.getBoundingClientRect();
      const clientWidth = $modalContents.clientWidth;
      const shift = (width - clientWidth) / 2;

      // shift modal contents by scrollbar width if present
      $modalContents.style.transform = `translateX(${shift}px)`;
    }
  });

  const { board, updating } = props;
  const toggleOpen = (): void => setOpen(!open);

  return (
    <div className="inline-block px-4 text-center align-top">
      <div className="flex items-center justify-center">
        <BoardName>{board.name}</BoardName>
        <Button
          onClick={toggleOpen}
          disabled={updating}
          className="-mr-8"
          title={OPEN_BUTTON_TOOLTIP}
        >
          <Icon
            name={updating ? "spinner" : "cog"}
            faProps={{ pulse: updating }}
          />
        </Button>
      </div>
      <ModeSelect />
      <Fade in={open}>
        <div
          className="fixed top-4 left-0 right-0 bottom-4 z-10 -mt-2"
          onWheel={stopPropagation}
        >
          <div
            className="relative w-1/2 max-h-full mx-auto pt-2 px-8 rounded-lg text-neutral-950 bg-white shadow-view overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#111_transparent]"
            ref={modalContentsRef}
          >
            <SettingsForm
              className="inline-block w-full"
              board={board}
              close={toggleOpen}
            />
          </div>
        </div>
      </Fade>
    </div>
  );
}
