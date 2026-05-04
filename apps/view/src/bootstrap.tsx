// @sctg/tracespace-view standalone app bootstrap
import React from "react";
import { createRoot } from "react-dom/client";

import TracespaceViewer from "./TracespaceViewer";

createRoot(document.querySelector("[data-hook=root]") as Element).render(
  <TracespaceViewer
    useStorage={true}
  />,
);
