// root component
import React, { useEffect, useRef } from "react";

import { useAppState, createBoard, createBoardFromUrl } from "./state";
import BoardDisplay from "./BoardDisplay";
import FileList from "./FileList";
import BoardList from "./BoardList";
import Nav from "./Nav";
import LoadFiles from "./LoadFiles";
import ErrorToast from "./ErrorToast";
import { preventDefault } from "./events";
import { Main } from "./ui";
import { FileEvent } from "./types";

export type FileProp = string | File | Blob | Array<File | Blob>;

export type AppProps = {
  showNav?: boolean;
  showPageTitle?: boolean;
  showPageTitleLogo?: boolean;
  pageTitle?: string;
  pageSubtitle?: string;
  showLoadFiles?: boolean;
  showFoooter?: boolean;
  file?: FileProp;
};

function App(props: AppProps): JSX.Element {
  const {
    showNav = true,
    showPageTitle = true,
    showPageTitleLogo = true,
    pageTitle = "tracespace",
    pageSubtitle = "view",
    showLoadFiles = true,
    showFoooter = false,
    file,
  } = props;
  const { dispatch, workerInitialized } = useAppState();
  const loadedFileRef = useRef<FileProp | undefined>(undefined);

  useEffect((): void => {
    if (!workerInitialized) return;
    if (file === undefined || file === loadedFileRef.current) return;
    loadedFileRef.current = file;

    if (typeof file === "string") {
      dispatch(createBoardFromUrl(file));
    } else {
      const files = Array.isArray(file) ? file : [file];
      const asFiles = files.map((f, i) =>
        f instanceof File ? f : new File([f], `board-${i}.zip`),
      );
      dispatch(createBoard(asFiles, false));
    }
  }, [file, workerInitialized, dispatch]);

  const handleFiles = (event: FileEvent): void => {
    const files =
      "dataTransfer" in event
        ? Array.from(event.dataTransfer.files)
        : Array.from(event.target.files || []);

    if (files.length > 0) dispatch(createBoard(files, "dataTransfer" in event));
    if ("value" in event.target) event.target.value = "";
    preventDefault(event);
  };

  const handleUrl = (url: string): void => {
    if (url) dispatch(createBoardFromUrl(url));
  };

  return (
    <Main onDragOver={preventDefault} onDrop={handleFiles}>
      <BoardDisplay />
      <FileList />
      <BoardList />
      {showNav && (
        <Nav
          handleFiles={handleFiles}
          handleUrl={handleUrl}
          showPageTitle={showPageTitle}
          showPageTitleLogo={showPageTitleLogo}
          pageTitle={pageTitle}
          pageSubtitle={pageSubtitle}
          showFoooter={showFoooter}
        />
      )}
      {showLoadFiles && (
        <LoadFiles handleFiles={handleFiles} handleUrl={handleUrl} />
      )}
      <ErrorToast />
    </Main>
  );
}

export default App;
