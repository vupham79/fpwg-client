import React, { Component } from "react";
import { Select, MenuItem, withStyles } from "@material-ui/core";

const listCategory = [
  "All",
  "Art",
  "Architecture",
  "Fashion",
  "Sports",
];

const useStyle = theme => ({
  root: {
    padding: "0.5rem",
    fontSize: "13px",
    color: "#555d66"
  }
});

class CategoryPickerComponent extends Component {
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
        {listCategory.map((category, index) => (
          <MenuItem key={index} value={category} style={{ color: "#555d66" }}>
            {category}
          </MenuItem>
        ))}
      </Select>
    );
  }
}

export default withStyles(useStyle)(CategoryPickerComponent);
