// board display controls for zoom bar and board vs layer render
import React, { useState } from "react";

import { Button, Icon } from "../ui";
import { stepToScale, scaleToStep } from "./display";
import { DisplayControllerProps } from "./types";

const ZOOM_RESET_TOOLTIP = "Reset pan and zoom";
const ZOOM_OUT_TOOLTIP = "Zoom out";
const ZOOM_IN_TOOTIP = "Zoom in";

export default function Controls(props: DisplayControllerProps): JSX.Element {
  const [grabbing, setGrabbing] = useState(false);
  const { step, reset, zoom, zoomIn, zoomOut } = props;
  const sliderLeft = `${stepToScale(step) * 100}%`;

  const handleGrabMove = (event: React.MouseEvent): void => {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const nextStep = scaleToStep((event.clientX - left) / width);
    zoom(nextStep - step);
  };

  return (
    <div className="absolute left-[calc(50%-100%/6)] bottom-4 z-10 w-1/3 flex items-center text-base">
      <Button
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        onClick={reset}
        title={ZOOM_RESET_TOOLTIP}
      >
        <Icon name="expand" />
      </Button>
      <Button className="shrink-0" onClick={zoomOut} title={ZOOM_OUT_TOOLTIP}>
        <Icon name="search-minus" />
      </Button>
      <span
        className="relative w-full h-8 flex items-center cursor-grab active:cursor-grabbing"
        onMouseDown={(event) => {
          setGrabbing(true);
          handleGrabMove(event);
        }}
        onMouseUp={() => setGrabbing(false)}
        onMouseMove={grabbing ? handleGrabMove : undefined}
      >
        <span className="inline-block pt-2 bg-white shadow-view w-full" />
        <span
          className="absolute w-4 h-4 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand opacity-70 transition-[left]"
          style={{ left: sliderLeft }}
        />
      </span>
      <Button className="shrink-0" onClick={zoomIn} title={ZOOM_IN_TOOTIP}>
        <Icon name="search-plus" />
      </Button>
    </div>
  );
}
