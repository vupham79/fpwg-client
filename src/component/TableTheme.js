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
import { getAllThemesAdmin } from "../actions";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
});

class TableTheme extends Component {

  getThemes = async () => {
    const { getAllThemesAdmin } = this.props;
    await getAllThemesAdmin();
  };

  componentDidMount() {
    this.getThemes();
  }

  render() {
    const { classes, themes } = this.props;
    return (
      <React.Fragment>
        <Title>Themes</Title>
        {themes && themes.length === 0 ? (
          <p style={{ fontStyle: "italic" }}>No existing theme.</p>
        ) : (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><p style={{ fontWeight: 'bold' }}>Name</p></TableCell>
                  <TableCell><p style={{ fontWeight: 'bold' }}>F.Body</p></TableCell>
                  <TableCell><p style={{ fontWeight: 'bold' }}>F.Title</p></TableCell>
                  <TableCell><p style={{ fontWeight: 'bold' }}>Main Color</p></TableCell>
                  <TableCell align="right"><p style={{ fontWeight: 'bold' }}>Categories</p></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {themes &&
                  themes.map(row => (
                    <TableRow key={row.id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.fontBody}</TableCell>
                      <TableCell>{row.fontTitle}</TableCell>
                      <TableCell>{row.mainColor}</TableCell>
                      <TableCell align="right">{row.categories.map(c => (c.name + ', '))}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )
        }
        <div className={classes.seeMore}>
          <Link color="primary" href="#" onClick={preventDefault}>
            See more
          </Link>
        </div>
      </React.Fragment >
    );
  }
}
const mapStateToProps = state => ({
  themes: state.theme.data,
  accessToken: state.user.accessToken,
  userId: state.user.profile.id,
});

const mapDispatchToProps = dispatch => ({
  getAllThemesAdmin: (id, accessToken) => dispatch(getAllThemesAdmin(id, accessToken)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(TableTheme));
