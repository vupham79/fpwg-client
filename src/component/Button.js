import React, { Component } from "react";
import { ButtonBase } from "@material-ui/core";

export default class Button extends Component {
  render() {
    const {
      label,
      onClick,
      color,
      disabled,
      backgroundColor,
      style
    } = this.props;
    return (
      <ButtonBase
        disabled={disabled}
        onClick={onClick}
        style={{
          fontFamily: "Segoe UI,sans-serif",
          background: "transparent",
          cursor: "pointer",
          display: "inline-block",
          margin: 0,
          outline: 0,
          overflow: "hidden",
          fontWeight: 500,
          textOverflow: "ellipsis",
          textDecoration: "none",
          verticalAlign: "top",
          boxSizing: "border-box",
          fontSize: "14px",
          lineHeight: "21px",
          borderRadius: "4px",
          padding: "7px 14px 9px",
          backgroundColor: backgroundColor ? backgroundColor : "#fff",
          color: color ? color : "#3c434a",
          border: "1px solid #c3c4c7",
          ...style
        }}
      >
        {label}
      </ButtonBase>
    );
  }
}
