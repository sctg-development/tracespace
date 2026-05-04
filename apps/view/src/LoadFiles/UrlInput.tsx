import React from "react";
import { Formik, Form, Field } from "formik";

import { useLocation } from "../hooks";
import { Button, Icon } from "../ui";
import { select } from "../events";

const INPUT_ID = "load-files_url-input";

const defaultUrl = (loc: Location | null): string => {
  if (!loc) return "";
  const baseUrl = import.meta.env.BASE_URL.endsWith("/")
    ? `${loc.origin}${import.meta.env.BASE_URL.slice(0, -1)}`
    : `${loc.origin}${import.meta.env.BASE_URL}`;
  return `${baseUrl}/arduino-uno.zip`;
};

export type UrlInputProps = {
  children?: React.ReactNode;
  handleUrl: (url: string) => unknown;
};

export default function UrlInput(props: UrlInputProps): JSX.Element {
  const { children, handleUrl } = props;
  const location = useLocation();

  return (
    <Formik
      initialValues={{ url: defaultUrl(location) }}
      onSubmit={(values) => {
        console.log("[UrlInput] Form submitted with URL:", values.url);
        handleUrl(values.url);
      }}
      enableReinitialize
    >
      {(formProps) => (
        <Form>
          <label htmlFor={INPUT_ID} className="block cursor-pointer mb-2">
            {children}
          </label>
          <div className="flex items-end h-8">
            <Field
              id={INPUT_ID}
              name="url"
              type="text"
              className="w-full mx-2 border-b border-t-0 border-r-0 border-l-0 border-neutral-950 font-mono text-sm text-center bg-transparent"
              onClick={select}
            />
            <Button
              type="submit"
              className="shrink-0 -mr-8 text-brand"
              disabled={!formProps.values.url}
            >
              <Icon name="check" />
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
