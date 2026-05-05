import React from "react";
import { Formik, Form, Field } from "formik";
import { Button, Drawer, HiddenInput, Icon, Label } from "../ui";
import { FileEvent } from "../types";

const TITLE = "new board";

const UPLOAD_FILES_LABEL = "upload files from your computer";
const ENTER_URL_LABEL = "enter the URL of a ZIP archive";
const ENTER_URL_PLACEHOLDER = "https://sctg-development.github.io/tracespace/arduino-uno.zip";
const FOOTER = "you can also drag-and-drop files into the app at any time";

export type OpenFileDrawerProps = {
  open: boolean;
  handleFiles: (event: FileEvent) => void;
  handleUrl: (url: string) => void;
  close: () => void;
};

function OpenFileDrawer(props: OpenFileDrawerProps): JSX.Element {
  const { open, handleFiles, handleUrl, close } = props;

  return (
    <Drawer title={TITLE} open={open} close={close}>
      <Label>
        <span className="mr-auto">{UPLOAD_FILES_LABEL}</span>
        <HiddenInput type="file" onChange={handleFiles} multiple />
        <Icon
          name="file-upload"
          className="shrink-0 ml-2 rounded text-brand text-xl cursor-pointer transition-colors hover:bg-black/20 focus-within:bg-black/20"
        />
      </Label>
      <p className="my-2 font-light text-sm italic text-center">or</p>
      <Formik
        initialValues={{ url: "" }}
        onSubmit={(values) => handleUrl(values.url)}
      >
        {(formikProps) => (
          <Form>
            <p className="mt-0 mb-2 pt-2">{ENTER_URL_LABEL}</p>
            <span className="flex items-end h-8">
              <Field
                name="url"
                type="text"
                className="w-full border-b border-t-0 border-r-0 border-l-0 border-neutral-950 font-mono text-xs"
                placeholder={ENTER_URL_PLACEHOLDER}
              />
              <Button type="submit" disabled={!formikProps.values.url}>
                <Icon
                  name="check"
                  className="shrink-0 ml-2 text-brand text-xl"
                />
              </Button>
            </span>
          </Form>
        )}
      </Formik>
      <footer className="mt-8 mb-1 text-xs leading-relaxed">{FOOTER}</footer>
    </Drawer>
  );
}

export default OpenFileDrawer;
