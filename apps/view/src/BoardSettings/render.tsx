import React from "react";
import cx from "classnames";
import { Field } from "formik";

import { Checkbox, HiddenInput, Label } from "../ui";
import { CoordinateFormat, ZeroSuppression, Units } from "../types";
import { FieldProps } from "./types";
import { GAP_FILL_DEFAULT } from "./values";

const USE_OUTLINE_LABEL = "use outline layer for board shape";
const GAP_FILL_LABEL = "gap fill limit";
const GAP_FILL_UNITS = "mm";
const OVERRIDE_LABEL = "override";
const COORD_FORMAT_LABEL = "integer/decimal coordinate format";
const ZERO_SUPRESSION_LABEL = "zero suppression";
const UNITS_LABEL = "units";

export function UseOutlineInput(props: FieldProps): JSX.Element {
  return (
    <Checkbox className="inline-flex align-middle" {...props.field}>
      {USE_OUTLINE_LABEL}
    </Checkbox>
  );
}

export function GapFillInput(props: FieldProps): JSX.Element {
  const { field, form } = props;
  const value = field.value !== "" ? field.value : GAP_FILL_DEFAULT;
  const disabled = !form.values.options.useOutline;
  const className = cx(
    "inline-flex items-center cursor-pointer h-8 align-middle float-right",
    {
      "opacity-40": disabled,
    },
  );

  return (
    <label className={className}>
      {GAP_FILL_LABEL}
      <input
        {...field}
        type="text"
        className={cx(
          "border-b border-t-0 border-r-0 border-l-0 border text-center text-neutral-950 border-neutral-950 bg-transparent font-mono text-sm",
          "w-12 ml-4 mr-2",
        )}
        disabled={disabled}
        value={value}
      />
      {GAP_FILL_UNITS}
    </label>
  );
}

type RenderSettingProps<Value> = {
  fieldName: string;
  renderName: string;
  overridden: boolean;
  defaultValue: Value | null | undefined;
};

export function CoordFormatFields(
  props: RenderSettingProps<CoordinateFormat>,
): JSX.Element {
  const { fieldName, renderName, overridden, defaultValue } = props;

  return (
    <OverridableField
      fieldName={fieldName}
      label={`${OVERRIDE_LABEL} ${renderName} ${COORD_FORMAT_LABEL}`}
      overridden={overridden}
      defaultValue={defaultValue}
    >
      <Field
        name={`${fieldName}[0]`}
        placeholder={defaultValue ? defaultValue[0] : ""}
        type="text"
        className={cx(
          "border-b border-t-0 border-r-0 border-l-0 border text-center text-neutral-950 border-neutral-950 bg-transparent font-mono text-sm",
          "w-8",
        )}
      />
      <span className="inline-block mx-2">.</span>
      <Field
        name={`${fieldName}[1]`}
        placeholder={defaultValue ? defaultValue[1] : ""}
        type="text"
        className={cx(
          "border-b border-t-0 border-r-0 border-l-0 border text-center text-neutral-950 border-neutral-950 bg-transparent font-mono text-sm",
          "w-8",
        )}
      />
    </OverridableField>
  );
}

type RadioGroupProps = FieldProps & {
  options: Array<{ value: string; label: string }>;
  defaultValue: unknown;
};

function RadioGroup(props: RadioGroupProps): JSX.Element {
  const { field, options, defaultValue } = props;

  return (
    <>
      {options.map((opt) => {
        const value = field.value || defaultValue;
        const checked = value === opt.value;

        return (
          <Label key={opt.value}>
            <HiddenInput
              {...field}
              type="radio"
              key={opt.value}
              value={opt.value}
              checked={checked}
            />
            <span
              className={cx("inline-block px-2 ml-2", {
                "border-b border border-brand": checked,
              })}
            >
              {opt.label}
            </span>
          </Label>
        );
      })}
    </>
  );
}

export function ZeroSuppressionFields(
  props: RenderSettingProps<ZeroSuppression>,
): JSX.Element {
  const { fieldName, renderName, overridden, defaultValue } = props;

  return (
    <OverridableField
      fieldName={fieldName}
      label={`${OVERRIDE_LABEL} ${renderName} ${ZERO_SUPRESSION_LABEL}`}
      overridden={overridden}
      defaultValue={defaultValue}
    >
      <Field
        name={fieldName}
        component={RadioGroup}
        defaultValue={defaultValue}
        options={[
          { value: "L", label: "leading" },
          { value: "T", label: "trailing" },
        ]}
      />
    </OverridableField>
  );
}

export function UnitsFields(props: RenderSettingProps<Units>): JSX.Element {
  const { fieldName, renderName, overridden, defaultValue } = props;

  return (
    <OverridableField
      fieldName={fieldName}
      label={`${OVERRIDE_LABEL} ${renderName} ${UNITS_LABEL}`}
      overridden={overridden}
      defaultValue={defaultValue}
    >
      <Field
        name={fieldName}
        component={RadioGroup}
        defaultValue={defaultValue}
        options={[
          { value: "in", label: "inches" },
          { value: "mm", label: "millimeters" },
        ]}
      />
    </OverridableField>
  );
}

type OverrideCheckboxProps = FieldProps & {
  label: string;
  defaultValue: unknown;
};

function OverrideCheckbox(props: OverrideCheckboxProps): JSX.Element {
  const { form, defaultValue, label } = props;
  const field = {
    ...props.field,
    checked: !!props.field.value,
    onBlur: () => {},
    onChange: (event: React.ChangeEvent<HTMLInputElement>): void => {
      const value = event.target.checked ? defaultValue : "";
      form.setFieldValue(props.field.name, value);
    },
  };

  return <Checkbox {...field}>{label}</Checkbox>;
}

type OverridableFieldProps = {
  fieldName: string;
  label: string;
  overridden: boolean;
  defaultValue: unknown;
  children: React.ReactNode;
};

function OverridableField(props: OverridableFieldProps): JSX.Element {
  const { fieldName, label, overridden, defaultValue, children } = props;

  return (
    <div className="flex items-center h-8 mt-1">
      <Field
        name={fieldName}
        component={OverrideCheckbox}
        defaultValue={defaultValue}
        label={label}
        className="flex"
      />
      <div
        className={cx("flex shrink-0 ml-auto", { "opacity-40": !overridden })}
      >
        {children}
      </div>
    </div>
  );
}
