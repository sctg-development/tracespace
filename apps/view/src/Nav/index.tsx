import React from "react";

import { useAppState } from "../state";
import { PageTitle, Slide } from "../ui";
import { FileEvent } from "../types";
import AppSettings from "../AppSettings";
import BoardSettings from "../BoardSettings";
import FileControls from "./FileControls";

import Footer from "./Footer";

type Props = {
  handleFiles: (event: FileEvent) => void;
  handleUrl: (url: string) => void;
  showPageTitle?: boolean;
  showPageTitleLogo?: boolean;
  pageTitle?: string;
  pageSubtitle?: string;
  showAnalyticsOptin?: boolean;
  showFoooter?: boolean;
};

export default function Nav(props: Props): JSX.Element {
  const { board, loading, updating } = useAppState();
  const {
    handleFiles,
    handleUrl,
    showPageTitle = true,
    showPageTitleLogo = true,
    pageTitle = "tracespace",
    pageSubtitle = "view",
    showAnalyticsOptin = false,
    showFoooter = false,
  } = props;
  const show = !loading && board !== null;

  return (
    <nav className="flex items-start justify-between relative w-full h-16">
      {showPageTitle ? (
        <PageTitle
          title={pageTitle}
          subtitle={pageSubtitle}
          showLogo={showPageTitleLogo}
          className="w-1/3 shrink-0"
        />
      ) : (
        <div className="w-1/3 shrink-0" />
      )}
      {board && (
        <Slide in={show} from="top">
          <BoardSettings board={board} updating={updating} />
        </Slide>
      )}
      <div className="shrink-0 flex items-start justify-end w-1/3">
        <FileControls
          buttonClassName={"ml-1 p-1 text-2xl"}
          handleFiles={handleFiles}
          handleUrl={handleUrl}
        />
        <AppSettings buttonClassName={"ml-1 p-1 text-2xl"} showAnalyticsOptin={showAnalyticsOptin} />
      </div>
      {showFoooter && <Footer />}
    </nav>
  );
}
