import React from "react";

export type TitledSectionProps = {
  title: string;
  children: React.ReactNode;
};

export function TitledSection(props: TitledSectionProps): JSX.Element {
  const { title, children } = props;

  return (
    <section className="text-left mb-8">
      <h3 className="mt-0 mb-2 text-base leading-tight font-bold">{title}</h3>
      {children}
    </section>
  );
}

export function SectionColumnLeft(props: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="inline-block w-1/2 border-r pr-4 align-top">
      {props.children}
    </div>
  );
}

export function SectionColumnRight(props: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="inline-block w-1/2 pl-4 align-top">{props.children}</div>
  );
}
