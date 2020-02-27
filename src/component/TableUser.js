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
import ActivateButton from "./ActivateButton";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
});

class TableUser extends Component {
  render() {
    const { classes, users } = this.props;
    return (
      <React.Fragment>
        <Title>Users</Title>
        {users && users.length === 0 ? (
          <p style={{ fontStyle: "italic" }}>No existing user</p>
        ) : (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Picture</TableCell>
                  <TableCell>Display Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell align="right">Activation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users &&
                  users.map(row => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <img
                          style={{ height: 30, width: 30 }}
                          src={row.picture}
                          alt=""
                        />
                      </TableCell>
                      <TableCell>{row.displayName}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell align="right">
                        <ActivateButton
                          userId={row.id}
                          isActivated={row.isActivated}
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
  users: state.user.users
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(TableUser));
