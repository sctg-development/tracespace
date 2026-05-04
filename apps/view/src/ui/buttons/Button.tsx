import React from "react";
import cx from "classnames";

export type ButtonProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  title?: string;
  type?: "button" | "submit" | "reset";
};

export function Button(props: ButtonProps): JSX.Element {
  const { onClick, title, children } = props;
  const type = props.type || "button";
  const disabled = Boolean(props.disabled);
  const className = cx(
    {
      "opacity-40": disabled,
      "cursor-pointer transition-colors hover:bg-black/20 focus-within:bg-black/20":
        !disabled,
    },
    "rounded",
    props.className,
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      title={title}
      suppressHydrationWarning={true}
    >
      {children}
    </button>
  );
}
