import { StylesConfig, GroupBase } from "react-select";
import { theme } from "./theme";

export const getReactSelectCustomStyles = (): StylesConfig<unknown, false, GroupBase<unknown>> => {
  return {
    input: (baseStyles) => {
      return {
        ...baseStyles,
        color: theme["text-color-secondary"]
      }
    },

    control: (baseStyles, state) => {
      return {
        ...baseStyles,
        width: "100%",
        padding: "0 4px",
        borderColor: theme["border-color"],
        background: theme["input-color"],
        boxShadow: "none",
        cursor: state.isDisabled ? "not-allowed" : "default",

        minHeight: "44px",
        fontSize: theme["text-sm"],

        ":hover": {
          borderColor: theme["border-color"],
        },

        ":focus": {
          borderColor: theme["border-color"],
        },
      }
    },

    clearIndicator: (baseStyles) => {
      return {
        ...baseStyles,
        color: "hsl(0, 0%, 50%)",

        ":hover": {
          color: "hsl(0, 0%, 60%)",
        }
      }
    },

    indicatorSeparator: (baseStyles) => {
      return {
        ...baseStyles,
        backgroundColor: "hsl(0, 0%, 25%)",
      }
    },

    dropdownIndicator: (baseStyles) => {
      return {
        ...baseStyles,
        color: "hsl(0, 0%, 50%)",

        ":hover": {
          color: "hsl(0, 0%, 60%)",
        }
      }
    },

    singleValue: (baseStyles) => {
      return {
        ...baseStyles,
        color: theme["text-color-secondary"],
      }
    },

    placeholder: (baseStyles) => {
      return {
        ...baseStyles,
        color: theme["text-color-secondary"],
        maxWidth: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }
    },

    option: (baseStyles, state) => {
      return {
        ...baseStyles,
        backgroundColor: state.isSelected ? theme["primary-color"] : "",
        fontSize: theme["text-sm"],
        color: theme["text-color-secondary"],

        ":hover": {
          backgroundColor: state.isSelected ? theme["primary-color-hover"] : theme["border-color"],
        },

        ":focus": {
          backgroundColor: theme["border-color"]
        }
      }
    },

    loadingIndicator: (baseStyles) => {
      return {
        ...baseStyles,
        color: theme["border-color"],
      }
    },

    loadingMessage: (baseStyles) => {
      return {
        ...baseStyles,
        fontSize: theme["text-sm"],
        color: theme["text-color-secondary"]
      }
    },

    noOptionsMessage: (baseStyles) => {
      return {
        ...baseStyles,
        fontSize: theme["text-sm"],
        color: theme["text-color-secondary"]
      }
    },

    menu: (baseStyles) => {
      return {
        ...baseStyles,
        boxShadow: `0 0 0 1px ${theme["border-color"]}`,
        background: theme["input-color"]
      }
    },
  }
}