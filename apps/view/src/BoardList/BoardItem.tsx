import React from "react";
import cx from "classnames";

import { BoardSummary } from "../types";
import { LazyThumbnail } from "../ui";

export type BoardItemProps = BoardSummary & {
  onClick: (id: string) => void;
  selected: boolean;
};

// TODO(mc, 2018-12-26): dedupe this logic
const DEFAULT_COLOR = "rgba(00, 66, 00, 0.75)";

export default function BoardItem(props: BoardItemProps): JSX.Element {
  const { id, name, selected, options, thumbnail } = props;
  const color = options.color.sm || DEFAULT_COLOR;
  const handleClick = (): unknown => !selected && props.onClick(id);

  return (
    <li
      className={cx("inline-block w-1/2 pl-4 pb-4 float-right", {
        "cursor-pointer": !selected,
      })}
      onClick={handleClick}
    >
      <div
        className={cx(
          "relative overflow-hidden w-full h-32 rounded-lg shadow-view",
        )}
      >
        <div className="w-full h-full bg-white">
          <p
            className={cx(
              "text-sm leading-tight my-0 mx-8 pt-2 text-center truncate",
              {
                "font-bold": selected,
              },
            )}
          >
            {name}
          </p>
          <LazyThumbnail
            url={thumbnail}
            spinnerColor={color}
            className="absolute top-2 bottom-4 left-4 right-4"
          />
        </div>
      </div>
    </li>
  );
}
