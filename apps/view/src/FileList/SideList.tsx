import React from "react";
import cx from "classnames";

import { stopPropagation } from "../events";
import { LayerRender } from "../types";
import {
  SIDE_TOP,
  SIDE_BOTTOM,
  SIDE_INNER,
  SIDE_ALL,
  orderLayers,
} from "../layers";
import SideItem from "./SideItem";

type Props = {
  layers: Array<LayerRender>;
  showFilenames: boolean;
};

const SIDES = [
  { label: "top", side: SIDE_TOP },
  { label: "bottom", side: SIDE_BOTTOM },
  { label: "inner", side: SIDE_INNER },
  { label: "mechanical", side: SIDE_ALL },
  { label: "other", side: null },
];

export default function SideList(props: Props): JSX.Element {
  const { layers, showFilenames } = props;

  return (
    <div
      className={cx(
        "absolute left-0 top-20 bottom-20 overflow-y-hidden transition-[width]",
        showFilenames ? "w-1/3" : "w-1/6",
      )}
    >
      <div
        onWheel={stopPropagation}
        className="w-full max-h-full overflow-y-auto px-4 scale-x-[-1] [scrollbar-width:thin] [scrollbar-color:#fff_transparent]"
      >
        <ul className="list-none mt-0 mb-4 pl-0 scale-x-[-1]">
          {SIDES.map((sideProps) => (
            <SideItem
              key={sideProps.label}
              label={sideProps.label}
              layers={layers
                .filter((ly) => ly.side === sideProps.side)
                .sort(orderLayers)}
              showFilenames={showFilenames}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
