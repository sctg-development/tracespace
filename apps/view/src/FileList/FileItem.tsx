import React from "react";
import cx from "classnames";

import { Fade } from "../ui";
import { LayerRender } from "../types";
import VisibilityButton from "./VisibilityButton";

type Props = LayerRender & { showFilenames: boolean };

const TYPE_UNKNOWN = "unknown";

export default function FileItem(props: Props): JSX.Element {
  const { id, side, type, converter, filename, color, showFilenames } = props;

  return (
    <li className="flex items-center h-8 mb-2 pl-4 rounded-lg overflow-hidden bg-white shadow-view">
      <p
        className={cx("text-sm leading-tight my-0 w-auto mr-auto", {
          "shrink-0": showFilenames,
        })}
      >
        {type || TYPE_UNKNOWN}
      </p>

      <Fade in={showFilenames}>
        <p className="text-sm leading-tight w-3/5 my-0 px-2 font-mono truncate">
          {filename}
        </p>
      </Fade>

      <VisibilityButton
        {...{ id, side, type, converter, color }}
        className="inline-block rounded-none text-base shrink-0"
      />
    </li>
  );
}
