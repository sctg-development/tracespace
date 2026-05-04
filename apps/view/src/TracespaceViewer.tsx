import React from "react";

import App from "./App";
import type { FileProp } from "./App";
import StoreProvider from "./state/StoreProvider";
import { StorageProvider } from "./StorageContext";
import "./styles/index.css";

export type { FileProp };

/**
 * Props for the {@text-inherit no-underline TracespaceViewer} component.
 */
export type TracespaceViewerProps = {
  /**
   * Show or hide the top navigation bar (file controls, board settings,
   * app settings). Defaults to `true`.
   */
  showNav?: boolean;

  /**
   * Show or hide the page title (logo + text) inside the navigation bar.
   * Has no effect when `showNav` is `false`. Defaults to `true`.
   */
  showPageTitle?: boolean;

  /**
   * Show or hide the tracespace logo inside the page title.
   * Has no effect when `showNav` or `showPageTitle` is `false`.
   * Defaults to `true`.
   */
  showPageTitleLogo?: boolean;

  /**
   * Main title text displayed in the page title.
   * Defaults to `"tracespace"`.
   */
  pageTitle?: string;

  /**
   * Subtitle text displayed in bold after the main title.
   * Defaults to `"view"`.
   */
  pageSubtitle?: string;

  /**
   * Show or hide the full-screen upload prompt (file input, URL input,
   * loading spinner). Set to `false` when supplying files programmatically
   * via the `file` prop. Defaults to `true`.
   */
  showLoadFiles?: boolean;

  /**
   * File(s) to load programmatically, without user interaction.
   *
   * - **`string`** — URL of a Gerber ZIP archive (fetched by the render worker).
   * - **`File`** — a single `File` object (e.g. from a native file picker).
   * - **`Blob`** — a raw binary blob; wrapped automatically as `board-0.zip`.
   * - **`Array<File | Blob>`** — multiple files treated as a single board.
   *
   * The file is dispatched to the render worker only after the worker signals
   * it is ready (`WORKER_INITIALIZED`), so it is safe to pass this prop on
   * first render. Changing this prop to a new value re-triggers the load.
   *
   * @example
   * // Load from a public URL
   * <TracespaceViewer showLoadFiles={false} file="/boards/arduino-uno.zip" />
   *
   * @example
   * // Load from a File picked by the user elsewhere in the app
   * <TracespaceViewer showLoadFiles={false} file={pickedFile} />
   */
  file?: FileProp;

  /**
   * Enable persistent storage of application preferences and state using IndexedDB.
   * When `true`, user preferences (display settings, board filters, etc.) are
   * preserved across page reloads. Defaults to `false`.
   */
  useStorage?: boolean;
};

/**
 * Self-contained Gerber/PCB viewer component for React 19 applications.
 *
 * Wraps the full tracespace render pipeline — including the Redux-like store,
 * the Web Worker render engine, and all UI panels — into a single embeddable
 * component. All props are optional; the component is fully functional with
 * no props (equivalent to the standalone tracespace view app).
 *
 * @example
 * // Minimal usage — renders the full viewer UI
 * <TracespaceViewer />
 *
 * @example
 * // Embedded kiosk mode — no chrome, load a fixed board automatically
 * <TracespaceViewer
 *   showNav={false}
 *   showLoadFiles={false}
 *   file="/boards/my-board.zip"
 * />
 *
 * @example
 * // Custom branding — hide the tracespace logo
 * <TracespaceViewer
 *   showPageTitleLogo={false}
 *   pageTitle="My App"
 *   pageSubtitle="PCB viewer"
 * />
 */
export default function TracespaceViewer(
  props: TracespaceViewerProps,
): JSX.Element {
  const { useStorage, ...appProps } = props;
  return (
    <StorageProvider useStorage={useStorage ?? false}>
      <StoreProvider useStorage={useStorage}>
        <App {...appProps} />
      </StoreProvider>
    </StorageProvider>
  );
}
