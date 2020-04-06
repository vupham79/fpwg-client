import React, { Component } from "react";
import { Select, MenuItem, withStyles } from "@material-ui/core";
import { getAllCategoriesAdmin } from "../actions";
import { connect } from "react-redux";

const useStyle = theme => ({
  root: {
    padding: "0.5rem",
    fontSize: "13px",
    color: "#555d66"
  }
});

class CategoryPickerComponent extends Component {

  componentDidMount() {
    this.props.getAllCategoriesAdmin();
  }

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
        {this.props.categories && this.props.categories.map((category) => (
          <MenuItem key={category.id} value={category} style={{ color: "#555d66" }}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.admin.categories
});

const mapDispatchToProps = dispatch => ({
  getAllCategoriesAdmin: () => dispatch(getAllCategoriesAdmin()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyle)(CategoryPickerComponent));
