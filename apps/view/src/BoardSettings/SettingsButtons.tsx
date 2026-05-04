import React from "react";

import { Button, DeleteButton, Icon } from "../ui";

const CANCEL_TOOLTIP = "Cancel";
const SAVE_TOOLTIP = "Save changes";

type Props = {
  delete: () => void;
};

export default function SettingsButtons(props: Props): JSX.Element {
  return (
    <>
      <div className="absolute top-4 right-4 -mt-2 -mr-2 text-xl">
        <Button
          type="reset"
          className="inline-block p-1"
          title={CANCEL_TOOLTIP}
        >
          <Icon name="times" />
        </Button>
        <Button type="submit" className="inline-block p-1" title={SAVE_TOOLTIP}>
          <Icon name="check" className="text-green-600" />
        </Button>
      </div>
      <DeleteButton
        onClick={props.delete}
        className="inline-block p-1 absolute top-4 left-4 -mt-2 -ml-2 text-xl"
      />
    </>
  );
}
