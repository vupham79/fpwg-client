import React, { Component } from "react";
import { Select, MenuItem, withStyles } from "@material-ui/core";
import { fontFamily } from "../constant/constant";
const useStyle = (theme) => ({
  root: {
    padding: "0.7rem",
    fontSize: "13px",
  },
});

class FontPickerComponent extends Component {
  handleLangChange = (event) => {
    this.props.onChange(event.target.value);
  };
  render() {
    const { selectedValue, classes } = this.props;
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
        {fontFamily.map((font, index) => (
          <MenuItem key={index} value={font}>
            {font}
          </MenuItem>
        ))}
      </Select>
    );
  }
}

export default withStyles(useStyle)(FontPickerComponent);
