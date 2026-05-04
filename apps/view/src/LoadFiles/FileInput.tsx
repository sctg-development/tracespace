import React from "react";

import { HiddenInput, Icon } from "../ui";
import { FileEvent } from "../types";

export type FileInputProps = {
  children?: React.ReactNode;
  handleFiles: (event: FileEvent) => unknown;
};

export default function FileInput(props: FileInputProps): JSX.Element {
  const { children, handleFiles } = props;

  return (
    <label className="block py-8 cursor-pointer">
      <HiddenInput type="file" onChange={handleFiles} multiple />
      <Icon name="plus" className="inline-block text-5xl text-brand" />
      {children}
    </label>
  );
}
