import React from "react";

export type MainProps = {
  children: React.ReactNode;
  onDragOver: (event: React.DragEvent<HTMLElement>) => void;
  onDrop: (event: React.DragEvent<HTMLElement>) => void;
};

export function Main(props: MainProps): JSX.Element {
  const { children, onDragOver, onDrop } = props;

  return (
    <main
      className="font-sans relative overflow-hidden h-full p-4 text-white bg-radial from-neutral-200 to-neutral-500"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {children}
    </main>
  );
}
