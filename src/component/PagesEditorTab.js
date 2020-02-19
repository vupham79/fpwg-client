import React from "react";
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";

import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { changeNavItems } from "../actions";

const SortableItem = SortableElement(({ value }) => <Button>{value}</Button>);

const SortableList = SortableContainer(({ items }) => {
  return (
    <Grid container direction="column">
      {items.map((value, index) => (
        <SortableItem key={index} index={index} value={value.name} />
      ))}
    </Grid>
  );
});

class PagesEditorTab extends React.Component {
  onChangeItem = ({ oldIndex, newIndex }) => {
    const { navItems, changeNavItems } = this.props;
    let temp = navItems[oldIndex];
    navItems[oldIndex] = navItems[newIndex];
    navItems[newIndex] = temp;
    changeNavItems(navItems);
  };

  render() {
    const { navItems } = this.props;
    console.log(navItems);
    return <SortableList items={navItems} onSortEnd={this.onChangeItem} />;
  }
}
const mapStateToProps = state => ({
  navItems: state.theme.navItems
});

const mapDispatchToProps = dispatch => ({
  changeNavItems: value => dispatch(changeNavItems(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(PagesEditorTab);
