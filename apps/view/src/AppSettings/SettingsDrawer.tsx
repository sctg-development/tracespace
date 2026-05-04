import React from "react";

import { VERSION } from "../pkg";
import { getAnalyticsUserId } from "../analytics";
import { select } from "../events";
import { useAppState, deleteAllBoards, updateAppPreferences } from "../state";
import { useStorageEnabled } from "../StorageContext";
import { DeleteButton, Drawer, Checkbox, Label } from "../ui";

const TITLE = "app settings";
const FOOTER = `tracespace v${VERSION}`;

const DELETE_SAVED_COPY = "delete all saved boards";
const USAGE_TRACKING_COPY = "send usage data to tracespace";
const USER_ID_COPY = "analytics user id";

type Props = {
  open: boolean;
  close: () => void;
};

export default function SettingsDrawer(props: Props): JSX.Element {
  const { appPreferences, dispatch } = useAppState();
  const useStorage = useStorageEnabled();
  const { open, close } = props;

  const handleTrackingChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    dispatch(updateAppPreferences({ analyticsOptIn: event.target.checked }));
  };

  const handleDeleteAllClick = (): void => {
    dispatch(deleteAllBoards());
    close();
  };

  return (
    <Drawer title={TITLE} open={open} close={close}>
      <Checkbox
        checked={appPreferences.analyticsOptIn || false}
        className="my-2"
        onChange={handleTrackingChange}
      >
        {USAGE_TRACKING_COPY}
      </Checkbox>

      {useStorage && (
        <Label className="my-2">
          <span className="mr-auto">{DELETE_SAVED_COPY}</span>
          <DeleteButton className="-mr-2" onClick={handleDeleteAllClick} />
        </Label>
      )}
      <footer className="mt-4 mb-1 text-xs leading-relaxed">
        <Label>
          <span className="shrink-0 mr-2">{USER_ID_COPY}:</span>
          <input
            className="w-full border-0 bg-transparent"
            type="text"
            value={getAnalyticsUserId() || "N/A"}
            onFocus={select}
            readOnly
          />
        </Label>
        {FOOTER}
      </footer>
    </Drawer>
  );
}
