import React from "react";
import cx from "classnames";

import { Logo } from "./Logo";

export type PageTitleProps = {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  className?: string;
};

export function PageTitle(props: PageTitleProps): JSX.Element {
  const { title = "tracespace", subtitle, showLogo = true, className } = props;

  return (
    <div className={cx("inline-block", className)}>
      {showLogo && <Logo className="pl-1 mr-4 align-bottom text-brand" />}
      <h1 className="inline-block my-0 text-2xl leading-tight font-normal">
        {title}
        {subtitle && <span className="font-bold">{` ${subtitle}`}</span>}
      </h1>
    </div>
  );
}
