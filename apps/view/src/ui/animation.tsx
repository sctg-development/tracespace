import React from "react";
import { CSSTransition } from "react-transition-group";

type AnimationProps = {
  in: boolean | string | null | undefined;
  children: React.ReactNode;
};

export type FadeProps = AnimationProps;

export function Fade(props: AnimationProps): JSX.Element {
  const nodeRef = React.useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={Boolean(props.in)}
      classNames={{
        enter: "opacity-[0.01]",
        enterActive: "opacity-100 transition-opacity duration-[250ms] ease-in",
        exit: "opacity-100",
        exitActive:
          "opacity-[0.01] transition-opacity duration-[250ms] ease-in",
      }}
      timeout={500}
      mountOnEnter
      unmountOnExit
    >
      <div ref={nodeRef} className="w-3/5">
        {props.children}
      </div>
    </CSSTransition>
  );
}

export type SlideProps = AnimationProps & {
  from: "top" | "bottom" | "left" | "right";
};

export function Slide(props: SlideProps): JSX.Element {
  const nodeRef = React.useRef<HTMLDivElement>(null);
  const slideFrom = {
    top: {
      enter: "-translate-y-full opacity-[0.01]",
      exitActive: "-translate-y-full",
    },
    right: {
      enter: "translate-x-full opacity-[0.01]",
      exitActive: "translate-x-full",
    },
    bottom: {
      enter: "translate-y-full opacity-[0.01]",
      exitActive: "translate-y-full",
    },
    left: {
      enter: "-translate-x-full opacity-[0.01]",
      exitActive: "-translate-x-full",
    },
  }[props.from];

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={Boolean(props.in)}
      classNames={{
        enter: slideFrom.enter,
        enterActive:
          "translate-x-0 translate-y-0 opacity-100 transition-[opacity,transform] duration-[250ms] ease-in",
        exit: "translate-x-0 translate-y-0 opacity-100",
        exitActive: `${slideFrom.exitActive} opacity-[0.01] transition-[opacity,transform] duration-[250ms] ease-in`,
      }}
      timeout={500}
      mountOnEnter
      unmountOnExit
    >
      <div ref={nodeRef}>{props.children}</div>
    </CSSTransition>
  );
}
