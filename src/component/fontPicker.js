import React, { Component } from "react";
import { Select, MenuItem, withStyles } from "@material-ui/core";
import WebFont from "webfontloader";

const listFont = [
  "Arial",
  "Roboto",
  "Courier New",
  "Courier",
  "Verdana",
  "Georgia",
  "Palatino",
  "Open Sans",
  "Comic Sans MS",
  "Arial Black",
  "Impact",
  "Catamaran",
  "Source Sans Pro",
  "Candara"
];

const useStyle = (theme) => ({
  root: {
    padding: "0.5rem",
    fontSize: "13px",
  },
});

class FontPickerComponent extends Component {
  handleLangChange = (event) => {
    this.props.onChange(event.target.value);
  };
  render() {
    const { selectedValue, classes } = this.props;
    WebFont.load({
      google: {
        families: [
          "Arial",
          "Roboto",
          "Courier New",
          "Courier",
          "Verdana",
          "Georgia",
          "Palatino",
          "Open Sans",
          "Comic Sans MS",
          "Arial Black",
          "Impact",
          "Catamaran",
          "Source Sans Pro",
        ],
      },
    });
    return (
      <Select
        classes={{
          root: classes.root,
        }}
        fullWidth
        variant={"outlined"}
        value={selectedValue}
        onChange={this.handleLangChange}
      >
        {listFont.map((font, index) => (
          <MenuItem key={index} value={font}>
            {font}
          </MenuItem>
        ))}
      </Select>
    );
  }
}

export default withStyles(useStyle)(FontPickerComponent);
