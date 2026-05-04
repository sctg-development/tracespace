import React from "react";

import { Button, Icon } from "../ui";

type Props = {
  show: boolean;
  toggle: () => void;
};

export default function ShowButton(props: Props): JSX.Element {
  const { show, toggle } = props;

  return (
    <Button
      className="absolute top-20 right-4 flex items-center text-base"
      onClick={toggle}
    >
      <p className="inline-block leading-tight my-0 ml-4 mr-2">
        {`${show ? "Hide" : "Show"} saved boards`}
      </p>
      <Icon name={show ? "chevron-right" : "chevron-left"} />
    </Button>
  );
}
