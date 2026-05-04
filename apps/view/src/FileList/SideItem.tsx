import React from "react";

import { LayerRender } from "../types";
import FileItem from "./FileItem";

type Props = {
  label: string;
  layers: Array<LayerRender>;
  showFilenames: boolean;
};

export default function SideList(props: Props): JSX.Element | null {
  const { label, layers, showFilenames } = props;
  if (layers.length === 0) return null;

  return (
    <li>
      <h3 className="my-2 pl-4 leading-tight text-base font-bold">{label}</h3>
      <ul className="list-none pl-0 my-0 text-neutral-950">
        {layers.map((layer) => (
          <FileItem key={layer.id} {...layer} showFilenames={showFilenames} />
        ))}
      </ul>
    </li>
  );
}
