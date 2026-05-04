import React from "react";

import { useTimeout } from "../hooks";
import { Button, Icon } from "../ui";

const DISMISS_TIMEOUT = 4000;

export type ToastProps = {
  dismiss: () => unknown;
  children: React.ReactNode;
};

export default function Toast(props: ToastProps): JSX.Element {
  const { dismiss, children } = props;

  useTimeout(dismiss, DISMISS_TIMEOUT);

  return (
    <div className="inline-block mx-auto fixed top-4 left-0 right-0 text-center">
      <div className="inline-flex items-center justify-center py-1 pl-4 pr-1 rounded bg-red-600 text-white shadow-view">
        <p className="my-0 mr-2">
          {"Error: "}
          {children}
        </p>
        <Button onClick={dismiss}>
          <Icon name="times" />
        </Button>
      </div>
    </div>
  );
}
