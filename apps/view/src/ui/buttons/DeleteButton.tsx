import React, { useState } from "react";
import cx from "classnames";

import { useWindowListener } from "../../hooks";
import { stopPropagation } from "../../events";
import { Icon } from "../Icon";

export type DeleteButtonProps = {
  className?: string;
  onClick: () => void;
};

const DELETE_ICON = "trash-alt";
const DELETE_COPY = "delete?";

export function DeleteButton(props: DeleteButtonProps): JSX.Element {
  const [armed, setArmed] = useState(false);
  const className = cx(
    "flex items-center border-0 p-0 rounded cursor-pointer transition-colors overflow-hidden",
    armed
      ? "text-white bg-red-600 hover:bg-red-800"
      : "text-red-600 bg-white hover:bg-black/20 focus-within:bg-black/20",
    props.className,
  );

  useWindowListener("click", () => armed && setArmed(false));

  return (
    <button type="button" onClick={handleClick} className={className}>
      <Icon name={DELETE_ICON} />
      <div
        className={cx(
          "shrink-0 transition-[max-width] overflow-hidden",
          armed ? "max-w-16" : "max-w-0",
        )}
      >
        <span className="inline-block pl-1 pr-2">{DELETE_COPY}</span>
      </div>
    </button>
  );

  function handleClick(event: React.MouseEvent): void {
    stopPropagation(event);

    if (armed) {
      setArmed(false);
      props.onClick();
    } else {
      setArmed(true);
    }
  }
}
