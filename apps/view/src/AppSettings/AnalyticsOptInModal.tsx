import React, { useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";

import { PRIVACY_URL } from "../pkg";
import { useTimeout } from "../hooks";
import { useAppState, updateAppPreferences } from "../state";
import { Fade, Checkbox, Button } from "../ui";
import { AppPreferences } from "../types";

const TITLE_COPY = "welcome to tracespace view!";
const USAGE_TRACKING_COPY_1 =
  "Please consider giving tracespace permission to collect anonymous usage data as you use this app.";
const USAGE_TRACKING_COPY_2 =
  "The tracespace project is open-source and developed by volunteers. Usage data is an important tool to help us decide where to focus our energy and measure how well the app is performing.";
const MORE_INFORMATION_COPY =
  "This data will never be shared or sold. For more information, a full list of the data collected, and instructions on how to request your data please see our";
const PRIVACY_POLICY_COPY = "Privacy Policy";
const USAGE_TRACKING_LABEL_COPY = "opt-in to anonymous usage tracking";
const BUTTON_COPY = "done";

export default function AnalyticsOptInToast(): JSX.Element {
  const { appPreferences, dispatch } = useAppState();
  const [show, setShow] = useState(false);

  useTimeout(
    () => setShow(true),
    appPreferences.analyticsOptIn == null ? 1000 : null,
  );

  return (
    <Fade in={show && appPreferences.analyticsOptIn == null}>
      <Formik
        initialValues={{ analyticsOptIn: true }}
        onSubmit={(values) => {
          dispatch(updateAppPreferences(values));
        }}
      >
        {() => (
          <Form className="fixed z-[999] inset-0 w-full flex items-center justify-center bg-black/50">
            <div className="relative py-4 px-8 rounded-lg text-neutral-950 bg-white shadow-view">
              <h3 className="font-normal mt-4 mb-2 text-xl leading-tight text-center">
                {TITLE_COPY}
              </h3>
              <p className="leading-relaxed my-4 max-w-2xl">
                {USAGE_TRACKING_COPY_1}
              </p>
              <Field name="analyticsOptIn">
                {(fieldProps: FieldProps<boolean, AppPreferences>) => {
                  const { value: checked, ...field } = fieldProps.field;

                  return (
                    <Checkbox
                      className="justify-center"
                      checked={checked}
                      {...field}
                    >
                      {USAGE_TRACKING_LABEL_COPY}
                    </Checkbox>
                  );
                }}
              </Field>
              <p className="leading-relaxed my-4 max-w-2xl">
                {USAGE_TRACKING_COPY_2}
              </p>
              <p className="leading-relaxed my-4 max-w-2xl">
                <span>{MORE_INFORMATION_COPY} </span>
                <a
                  className="text-inherit no-underline text-blue-600 transition-opacity hover:opacity-50"
                  href={PRIVACY_URL}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {PRIVACY_POLICY_COPY}
                </a>
                <span>.</span>
              </p>
              <Button
                className="mt-4 px-8 py-2 text-base bg-neutral-950 text-white text-center float-right"
                type="submit"
              >
                {BUTTON_COPY}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Fade>
  );
}
