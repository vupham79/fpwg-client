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
                  <TableCell>Theme</TableCell>
                  <TableCell>Published</TableCell>
                  <TableCell>Categories</TableCell>
                  <TableCell align="right">Unknown</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sites &&
                  sites.map(row => (
                    <TableRow key={row.id}>
                      <TableCell>{row.user}</TableCell>
                      <TableCell>{row.theme}</TableCell>
                      <TableCell>{row.isPublished}</TableCell>
                      <TableCell>{row.categories}</TableCell>
                      <TableCell align="right">{row.amount}</TableCell>
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
