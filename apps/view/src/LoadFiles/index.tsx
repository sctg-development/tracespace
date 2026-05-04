import React from "react";

import { useAppState } from "../state";
import { Icon, Fade } from "../ui";
import { FileEvent } from "../types";
import FileInput from "./FileInput";
import UrlInput from "./UrlInput";

const UPLOAD_MESSAGE =
  "Upload your Gerber and drill files to render your board";
const UPLOAD_SUBMESSAGE = "ZIP files work, too";
const URL_MESSAGE = "or enter the URL of a ZIP archive";

export type LoadFilesProps = {
  handleFiles: (event: FileEvent) => void;
  handleUrl: (url: string) => void;
};

export default function LoadFiles(props: LoadFilesProps): JSX.Element {
  const { mode, loading } = useAppState();

  return (
    <>
      <Fade in={loading}>
        <Icon
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-5xl text-brand"
          name="spinner"
          faProps={{ pulse: true }}
        />
      </Fade>
      <Fade in={!mode && !loading}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-neutral-950 text-center">
          <FileInput handleFiles={props.handleFiles}>
            <p className="mt-4 mb-0 text-xl leading-relaxed">
              {UPLOAD_MESSAGE}
              <br />
              <span className="text-base font-light">
                ({UPLOAD_SUBMESSAGE})
              </span>
            </p>
          </FileInput>
          <UrlInput handleUrl={props.handleUrl}>{URL_MESSAGE}</UrlInput>
        </div>
      </Fade>
    </>
  );
}
