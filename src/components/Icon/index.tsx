import React from "react";
import * as AllIcons from "@ant-design/icons"
type AllKeys = keyof (typeof AllIcons);

type PickerCapitalizeAsComp<K extends AllKeys> = K extends Capitalize<K> ? K : never;

export const Icon = ({ type, ...props }) => {
  const iconNames: string[] = Object.keys(AllIcons);
  if (!iconNames.includes(type)) {
    if (props.component) {
      return React.createElement(props.component);
    }
    return React.createElement("div");
  }
  const iconType = type as unknown as PickerCapitalizeAsComp<AllKeys>;
  const Comp = AllIcons[iconType] as React.ClassType<any, any, any>;
  return <Comp {...props} />
}