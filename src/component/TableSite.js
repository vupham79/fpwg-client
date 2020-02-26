import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  Link
} from "@material-ui/core";
import Title from "./Title";
import SwitchButton from "./SwitchButton";
import { connect } from "react-redux";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
});

class TableSite extends Component {
  render() {
    const { classes, sites } = this.props;
    return (
      <React.Fragment>
        <Title>Sites</Title>
        {sites && sites.length === 0 ? (
          <p style={{ fontStyle: "italic" }}>No existing site</p>
        ) : (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Owner</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Theme</TableCell>
                  <TableCell>Categories</TableCell>
                  <TableCell align="right">Published</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sites &&
                  sites.map(row => (
                    <TableRow key={row.id}>
                      <TableCell>{row.user.displayName}</TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.theme.name}</TableCell>
                      <TableCell>{row.categories.map(c => (c.name + ', '))}</TableCell>
                      <TableCell align="right">
                        <SwitchButton
                          siteId={row.id}
                          siteName={row.title}
                          isPublish={row.isPublish}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        <div className={classes.seeMore}>
          <Link color="primary" href="#" onClick={preventDefault}>
            See more
          </Link>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  sites: state.site.adminData
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(TableSite));
