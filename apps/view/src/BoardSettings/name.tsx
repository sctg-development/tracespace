import React from "react";

import { FieldProps } from "./types";

export function BoardName(props: { children: React.ReactNode }): JSX.Element {
  return (
    <h2 className="text-2xl leading-tight font-normal text-center my-0 mx-2">
      {props.children}
    </h2>
  );
}

export function BoardNameInput(props: FieldProps): JSX.Element {
  return (
    <input
      type="text"
      className="text-2xl leading-tight font-normal text-center mb-4 border-b border-t-0 border-r-0 border-l-0 border-neutral-950"
      autoComplete="off"
      data-lpignore="true"
      {...props.field}
    />
  );
}
