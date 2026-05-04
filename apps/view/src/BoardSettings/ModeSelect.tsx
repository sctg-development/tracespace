import React from "react";
import cx from "classnames";

import { useAppState, setMode } from "../state";
import { Button } from "../ui";

export default function ModeSelect(): JSX.Element | null {
  const { mode, dispatch } = useAppState();

  if (!mode) return null;

  const buttons = [
    { mode: "layers", onClick: () => dispatch(setMode("layers")) },
    { mode: "top", onClick: () => dispatch(setMode("top")) },
    { mode: "bottom", onClick: () => dispatch(setMode("bottom")) },
  ];

  return (
    <div className="mt-2">
      {buttons.map((button) => (
        <Button
          key={button.mode}
          className="inline-block text-center"
          onClick={button.onClick}
        >
          <span
            className={cx(
              "block w-12 mt-2 mx-2 mb-1 border-b-2",
              mode === button.mode ? "border-brand" : "border-transparent",
            )}
          >
            {button.mode}
          </span>
        </Button>
      ))}
    </div>
  );
}
