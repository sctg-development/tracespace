import React, { useState } from "react";
import cx from "classnames";

import { VERSION } from "../pkg";
import { Button, Icon } from "../ui";
import SettingsDrawer from "./SettingsDrawer";
import AnalyticsOptInModal from "./AnalyticsOptInModal";

const HELP_TOOLTIP = "Troubleshooting";
const HELP_HREF = `https://github.com/sctg-development/tracespace/blob/v${VERSION}/apps/view/HELP.md`;

const SETTINGS_TOOLTIP = "App settings";

export type AppSettingsProps = {
  buttonClassName: string;
  showAnalyticsOptin?: boolean;
};

export default function AppSettings(props: AppSettingsProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const { buttonClassName, showAnalyticsOptin = false } = props;
  const toggleOpen = (): void => setOpen(!open);

  return (
    <>
      <a
        href={HELP_HREF}
        title={HELP_TOOLTIP}
        target="_blank"
        rel="noreferrer noopener"
        className={cx(
          "rounded cursor-pointer transition-colors hover:bg-black/20 focus-within:bg-black/20",
          buttonClassName,
        )}
      >
        <Icon name="question-circle" />
      </a>
      <Button
        onClick={toggleOpen}
        title={SETTINGS_TOOLTIP}
        className={buttonClassName}
      >
        <Icon name="sliders-h" />
      </Button>
      <SettingsDrawer open={open} close={toggleOpen} />
      {showAnalyticsOptin && <AnalyticsOptInModal />}
    </>
  );
}
