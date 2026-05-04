import React, { useState } from "react";
import cx from "classnames";

import { useTimeout } from "../hooks";
import { preventDefault, select } from "../events";
import { Label, Icon } from "../ui";

export type BoardUrlProps = {
  url: string;
};

const SUCCESS_TIMEOUT = 1200;

const PARAM = "?boardUrl=";

export default function BoardUrl(props: BoardUrlProps): JSX.Element {
  const [selected, setSelected] = useState(false);
  const [success, setSuccess] = useState(false);

  useTimeout(() => setSuccess(false), success ? SUCCESS_TIMEOUT : null);

  const { url } = props;
  const { origin, pathname } = window.location;
  const href = `${origin}${pathname}`;
  const copyValue = url ? `${href}${PARAM}${encodeURIComponent(url)}` : "";
  const textStyle = cx(
    "flex items-center my-0 leading-relaxed text-neutral-950 transition-colors text-neutral-950",
    selected ? "bg-sky-200" : "bg-white",
  );
  const iconStyle = cx(
    "shrink-0 ml-1 -mr-8 rounded transition-colors transition-colors",
    success ? "text-white bg-brand" : "text-neutral-950 bg-white",
  );

  return (
    <Label
      className="justify-center text-sm leading-none mb-4"
      onCopy={(event) => {
        setSuccess(true);
        event.currentTarget.focus();
        event.clipboardData.setData("text/plain", copyValue);
        preventDefault(event);
      }}
    >
      <p className={textStyle}>
        <span className="font-light">
          {href}
          {PARAM}
        </span>
        <span>{url}</span>
      </p>
      <Icon name="copy" className={iconStyle} />
      <input
        type="text"
        value={copyValue}
        className="sr-only"
        onClick={(event) => {
          select(event);
          document.execCommand("copy");
        }}
        onFocus={(event) => {
          select(event);
          setSelected(true);
        }}
        onBlur={() => {
          setSelected(false);
          setSuccess(false);
        }}
        readOnly
      />
    </Label>
  );
}
