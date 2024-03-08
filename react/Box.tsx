import React, { ReactChildren } from "react";
import { Link } from "vtex.render-runtime";

import { default as s } from "./styles.css";

type BoxProps = {
  tag?: string
  id?: string
  attributes?: Array<AttributeObject> | any
  children?: ReactChildren
  tokens?: string
  blockClass?: string
  text?: string
}

type AttributeObject = {
  key: string
  value: string
}

const defaultTag = "div";
const classPrefix = s.classPrefix.split("classPrefix")[0];

const Box = ({ tag, id, text, children, attributes, blockClass, tokens }: BoxProps) => {
  const CustomTag = tag || defaultTag;
  const classString = blockClass ? `${classPrefix}${blockClass} ${tokens || ""}` : `${tokens || ""}`;

  const htmlAttributes = attributes?.reduce((accumulator: any, currentValue: AttributeObject) =>
    Object.assign(accumulator, { [currentValue.key]: currentValue.value }), {});

  if (tag === "a") {
    // <Link> requires a "to" attribute to navigate.
    const hrefValue: string = attributes?.find((item: AttributeObject) => item.key === "href").value;

    if (hrefValue) {
      const isExternalLink = hrefValue.includes("http");

      if (!isExternalLink) {
        htmlAttributes["to"] = hrefValue;
        delete htmlAttributes.href;
      }
    }

    return <Link id={id} {...htmlAttributes} className={classString}>{text || children}</Link>;
  }

  return <CustomTag id={id} {...htmlAttributes} className={classString}>{text || children}</CustomTag>;
}

Box.schema = {
  title: 'Element',
  description: '',
  type: 'object',
  properties: {
    tag: {
      title: "HTML Element Tag",
      description: "div, article, h2... Do not include <>.",
      type: "string"
    },
    text: {
      title: "Inner Text",
      description: "Only used if there are no children / decendants.",
      type: "string",
      widget: { "ui:widget": "textarea" }
    },
    tokens: {
      title: "Class Tokens",
      description: "Bootstrap or Custom Classes.",
      type: "string",
    },
    attributes: {
      title: "Attributes",
      description: "List of attributes for HTML Element",
      type: "array",
      items: {
        properties: {
          key: {
            title: "Key",
            type: "string"
          },
          value: {
            title: "Value",
            type: "string"
          }
        }
      }
    },
    id: {
      title: "HTML Id",
      description: "Only edit with permission.",
      type: "string",
    }
  }
};

export default Box
