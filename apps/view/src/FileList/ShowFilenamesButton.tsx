import React from "react";

import { Button, Icon } from "../ui";

type Props = {
  showFilenames: boolean;
  toggle: () => void;
};

export default function ShowFilenamesButton(props: Props): JSX.Element {
  const { showFilenames, toggle } = props;

  return (
    <Button
      className="absolute left-4 bottom-8 flex items-center text-base"
      onClick={toggle}
    >
      <Icon name={showFilenames ? "chevron-left" : "chevron-right"} />
      <p className="inline-block leading-tight my-0 ml-2 mr-4">
        {`${showFilenames ? "Hide" : "Show"} filenames`}
      </p>
    </Button>
  );
}
