import {
  Container,
  CssBaseline,
  Dialog,
  Grid,
  withStyles,
  Typography
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { closeDialog, openDialog } from "../../actions";

const useStyles = theme => ({
  root: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(10)
  },
  gridItems: {
    maxHeight: 350
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
});

const imgStyles = {
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  width: "100%",
  height: "100%"
};

class GalleryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: ""
    };
  }
  render() {
    const handleOpenDialog = (openDialog, image) => {
      this.setState({ img: image });
      openDialog();
    };
    const { classes, open, openDialog, closeDialog, galleries } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <Container className={classes.root}>
          <Grid container spacing={2} justify="center">
            {galleries ? (
              galleries.map((item, index) => (
                <Grid
                  item
                  key={index}
                  xs={12}
                  sm={4}
                  md={3}
                  className={classes.gridItems}
                >
                  <img
                    src={item.url}
                    alt="Title"
                    style={imgStyles}
                    onClick={() => handleOpenDialog(openDialog, item.url)}
                    aria-labelledby="form-dialog-title"
                  />
                </Grid>
              ))
            ) : (
              <Typography>You don't have any Gallery.</Typography>
            )}
          </Grid>
          <Dialog open={open} onClose={closeDialog} maxWidth="sm" fullWidth>
            <img style={imgStyles} src={this.state.img} alt="" />
          </Dialog>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  open: state.dialog.open
});

const mapDispatchToProps = dispatch => ({
  openDialog: () => dispatch(openDialog()),
  closeDialog: () => dispatch(closeDialog())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(GalleryComponent));