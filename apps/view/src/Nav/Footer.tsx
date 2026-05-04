import React from "react";

import {
  REPO_URL,
  AUTHOR_NAME,
  AUTHOR_URL,
  CONTRIBUTORS_URL,
  PRIVACY_URL,
} from "../pkg";

export default function Footer(): JSX.Element {
  return (
    <footer className="fixed right-4 bottom-4 w-1/3 text-right">
      <p className="my-0 leading-relaxed text-xs text-white">
        {"© 2015 - 2026 by "}
        <a
          href={AUTHOR_URL}
          className="text-inherit no-underline transition-opacity hover:opacity-50 font-light text-blue-100"
        >
          {AUTHOR_NAME.toLowerCase()}
        </a>{" "}
        {"and "}
        <a
          href={CONTRIBUTORS_URL}
          className="text-inherit no-underline transition-opacity hover:opacity-50 font-light text-blue-100"
        >
          contributors
        </a>
      </p>
      <p className="my-0 leading-relaxed text-xs text-white">
        <a
          href={PRIVACY_URL}
          className="text-inherit no-underline transition-opacity hover:opacity-50 font-light text-blue-100"
        >
          privacy policy
        </a>
        {" | "}
        <a
          href={REPO_URL}
          className="text-inherit no-underline transition-opacity hover:opacity-50 font-light text-blue-100"
        >
          view source
        </a>
      </p>
    </footer>
  );
}
