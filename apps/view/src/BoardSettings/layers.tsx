import React from "react";
import cx from "classnames";

import { ColorPill, HiddenInput, Label } from "../ui";
import { SIDE_ALL, ALL_TYPES, typeToValidSides } from "../layers";
import { GerberType } from "../types";
import { FieldProps } from "./types";

type LayerListProps = {
  children: React.ReactNode;
};

export function LayerList(props: LayerListProps): JSX.Element {
  return <ul className="list-none pl-0 my-0">{props.children}</ul>;
}

type LayerItemProps = {
  filename: string;
  children: React.ReactNode;
};

export function LayerItem(props: LayerItemProps): JSX.Element {
  const { filename } = props;

  return (
    <li className="flex items-center mb-4">
      <p className="font-mono text-base leading-tight my-0 mr-auto">
        {filename}
      </p>
      {props.children}
    </li>
  );
}

type LayerFieldProps = FieldProps & { layerId: string };

export function LayerTypeSelect(props: LayerFieldProps): JSX.Element {
  const { layerId, form, field } = props;

  return (
    <select
      {...field}
      className="inline-block shrink-0 text-base w-16 mr-2"
      onChange={(event) => {
        const type = (event.target.value as GerberType) || "";
        const layer = form.values.layers[layerId];
        const validSides = typeToValidSides(type);
        const side = validSides.includes(layer.side)
          ? layer.side
          : validSides[0] || "";

        form.setValues({
          ...form.values,
          layers: {
            ...form.values.layers,
            [layerId]: { ...layer, type, side },
          },
        });
      }}
    >
      {ALL_TYPES.map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
      <option value="">n/a</option>
    </select>
  );
}

export function LayerSideSelect(props: LayerFieldProps): JSX.Element {
  const { layerId, field, form } = props;
  const { type } = form.values.layers[layerId];
  const options: Array<string> = typeToValidSides(type);
  const disabled = options.length < 2;

  if (options.length < 1) options.push("");

  return (
    <select
      className="inline-block shrink-0 text-base w-16 mr-2"
      disabled={disabled}
      {...field}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt === SIDE_ALL || opt === "" ? "n/a" : opt}
        </option>
      ))}
    </select>
  );
}

export function LayerColorInput(props: LayerFieldProps): JSX.Element {
  const { layerId, field, form } = props;
  const { type } = form.values.layers[layerId];
  const disabled = type === "";

  return (
    <Label className="h-8" disabled={disabled}>
      <HiddenInput type="color" disabled={disabled} {...field} />
      <ColorPill
        color={field.value}
        className={cx({ "opacity-40": disabled })}
      />
    </Label>
  );
}
