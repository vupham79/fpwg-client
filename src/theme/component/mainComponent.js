import {
  Dialog,
  makeStyles,
  withStyles
} from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleRight
} from "@fortawesome/free-solid-svg-icons";

export default function AccordionButton({ isNav, comp, label, currentNav, setNav }) {
  const [onHover, setHover] = useState(false);

  return (
    <React.Fragment>
      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => setNav(true, label)}
        style={{
          border: "1px solid",
          borderLeft: onHover ? "4px solid" : "none",
          borderColor: onHover ? "#0074aa" : "#dddddd",
          backgroundColor: onHover ? "#f7f5f5" : "white",
          display: isNav ? "none" : "block"
        }}>
        <h3
          style={{
            color: onHover ? "#0074aa" : "#565d66",
            fontSize: 14,
            textAlign: "left",
            marginLeft: 2
          }}>
          {label}
          <FontAwesomeIcon style={{ float: "right" }} icon={faArrowCircleRight} color={onHover ? "#0074aa" : "#dddddd"} size="1x" />
        </h3>
      </button>
      <div style={{ display: (isNav && currentNav == label) ? "block" : "none" }}>
        {comp}
      </div>
    </React.Fragment>
  );
}