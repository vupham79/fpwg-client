import { Grid, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import VisibilityIcon from "@material-ui/icons/Visibility";
import React from "react";
import { connect } from "react-redux";
import {
  sortableContainer,
  sortableElement,
  sortableHandle
} from "react-sortable-hoc";
import { changeNavItems } from "../actions";

const gridContainer = {
  borderStyle: "solid",
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#2a2e2a",
  marginTop: "2rem"
};

const viewButton = {
  color: "black",
  position: "absolute",
  right: "1rem"
};

const gridItem = {
  width: "auto",
  borderStyle: "solid",
  borderColor: "#2a2e2a",
  borderWidth: 1.5,
  padding: "0.5rem",
  margin: "0.7rem",
  zIndex: "99999999"
};

const DragHandle = sortableHandle(() => (
  <MenuIcon style={{ paddingRight: "0.4rem" }} />
));

const SortableItem = sortableElement(({ value }) => (
  <Grid container alignItems="center" style={gridItem}>
    <DragHandle />
    {value}
    <IconButton style={viewButton}>
      <VisibilityIcon />
    </IconButton>
  </Grid>
));

const SortableList = sortableContainer(({ items }) => {
  return (
    <Grid container direction="column" style={gridContainer}>
      {items.map((value, index) => (
        <SortableItem key={index} index={index} value={value.name} />
      ))}
    </Grid>
  );
});

class PagesEditorTab extends React.Component {
  onChangeItem = ({ oldIndex, newIndex }) => {
    const { site, changeNavItems } = this.props;
    let temp = site.navItems[oldIndex];
    site.navItems[oldIndex] = site.navItems[newIndex];
    site.navItems[newIndex] = temp;
    changeNavItems(site);
  };

  render() {
    const { site } = this.props;
    return (
      <SortableList
        items={site.navItems}
        onSortEnd={this.onChangeItem}
        useDragHandle
      />
    );
  }
}
const mapStateToProps = state => ({
  site: state.site.siteEdit
});

const mapDispatchToProps = dispatch => ({
  changeNavItems: value => dispatch(changeNavItems(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(PagesEditorTab);
