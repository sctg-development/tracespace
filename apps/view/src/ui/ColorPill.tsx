import React from "react";
import cx from "classnames";
import contrast from "contrast";

export type ColorPillProps = {
  color: string;
  className?: string;
};

export function ColorPill(props: ColorPillProps): JSX.Element {
  const color = props.color.slice(0, 7);
  const dark = contrast(color) === "dark";
  const className = cx(
    "box-border shrink-0 rounded-full py-1 px-2 font-mono text-sm",
    dark ? "text-white" : "text-neutral-950 ba",
    props.className,
  );
  const style = { backgroundColor: color };

  return (
    <span className={className} style={style}>
      {color}
    </span>
  );
}
