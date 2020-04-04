import React, { Component } from "react";
import { Select, MenuItem, withStyles } from "@material-ui/core";

const listFont = [
  "Arial",
  "Roboto",
  "Times New Roman",
  "Times",
  "Courier New",
  "Courier",
  "Verdana",
  "Georgia",
  "Palatino",
  "Garamond",
  "Bookman",
  "Comic Sans MS",
  "Candara",
  "Arial Black",
  "Impact",
  "Catamaran",
];

const useStyle = theme => ({
  root: {
    padding: "0.5rem",
    fontSize: "13px"
  }
});

class FontPickerComponent extends Component {
  handleLangChange = event => {
    this.props.onChange(event.target.value);
  };
  render() {
    const { selectedValue, classes } = this.props;
    return (
      <Select
        classes={{
          root: classes.root
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
