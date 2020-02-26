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
import { changeNavItems, setActiveNavItems } from "../actions";

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

function handleChangeActive(item, site, setActiveNavItems) {
  const index = site.navItems.find(e => e._id === item._id);
  if (index.isActive) {
    index.isActive = false;
  } else {
    index.isActive = true;
  }
  console.log(site.navItems)
  setActiveNavItems(site);
}

const SortableItem = sortableElement(
  ({ value, site, item, setActiveNavItems }) => (
    <Grid container alignItems="center" style={gridItem}>
      <DragHandle />
      {value}
      <IconButton
        style={viewButton}
        onClick={() => handleChangeActive(item, site, setActiveNavItems)}
      >
        <VisibilityIcon />
      </IconButton>
    </Grid>
  )
);

const SortableList = sortableContainer(({ items, site, setActiveNavItems }) => {
  return (
    <Grid container direction="column" style={gridContainer}>
      {items.map((value, index) => (
        <SortableItem
          key={index}
          index={index}
          value={value.name}
          item={value}
          site={site}
          setActiveNavItems={setActiveNavItems}
        />
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
    site.navItems.map((item, index) => (item.order = index + 1));
    changeNavItems(site);
  };

  render() {
    const { site, setActiveNavItems } = this.props;
    return (
      <SortableList
        items={site.navItems}
        onSortEnd={this.onChangeItem}
        useDragHandle
        site={site}
        setActiveNavItems={setActiveNavItems}
      />
    );
  }
}
const mapStateToProps = state => ({
  site: state.site.siteEdit
});

const mapDispatchToProps = dispatch => ({
  changeNavItems: value => dispatch(changeNavItems(value)),
  setActiveNavItems: site => dispatch(setActiveNavItems(site))
});

export default connect(mapStateToProps, mapDispatchToProps)(PagesEditorTab);
