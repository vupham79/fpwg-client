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
import PublishButtonAdmin from "./PublishButtonAdmin";
import { connect } from "react-redux";
import { getAllSites } from "../actions";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
});

class TableSite extends Component {

  getSites = async () => {
    const { accessToken, userId, getAllSites } = this.props;
    await getAllSites({ accessToken, userId });
  };

  componentDidMount() {
    this.getSites();
  }

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
                  <TableCell><p style={{ fontWeight: 'bold' }}>Owner</p></TableCell>
                  <TableCell><p style={{ fontWeight: 'bold' }}>Title</p></TableCell>
                  <TableCell><p style={{ fontWeight: 'bold' }}>Theme</p></TableCell>
                  <TableCell><p style={{ fontWeight: 'bold' }}>Categories</p></TableCell>
                  <TableCell align="right"><p style={{ fontWeight: 'bold' }}>Published</p></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sites &&
                  sites.map(row => (
                    <TableRow key={row.id}>
                      <TableCell></TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.theme.name}</TableCell>
                      <TableCell>{row.categories.map(c => (c.name + ', '))}</TableCell>
                      <TableCell align="right">
                        <PublishButtonAdmin
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
  sites: state.site.adminData,
  accessToken: state.user.accessToken,
  userId: state.user.profile.id,
});

const mapDispatchToProps = dispatch => ({
  getAllSites: (id, accessToken) => dispatch(getAllSites(id, accessToken)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(TableSite));
