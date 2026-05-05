import React from "react";

import { Slide } from "./animation";
import { Button } from "./buttons";
import { Icon } from "./Icon";

export type DrawerProps = {
  title: string;
  open: boolean;
  children: React.ReactNode;
  close: () => unknown;
};

export function Drawer(props: DrawerProps): JSX.Element {
  const { title, open, children, close } = props;

  return (
    <Slide in={open} from="right">
      <section className="fixed top-4 right-4 z-100 w-1/4 -mt-2 -mr-2 py-2 px-4 rounded-lg text-neutral-950 bg-white shadow-view">
        <div className="flex items-center mb-4">
          <h2 className="mr-auto text-2xl leading-tight my-0 font-normal">
            {title}
          </h2>
          <Button onClick={close} className="shrink-0 -mr-2 text-xl">
            <Icon name="times" />
          </Button>
        </div>
        {children}
      </section>
    </Slide>
  );
}
