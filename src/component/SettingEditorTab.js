import React from "react";
import { TextField, Grid } from "@material-ui/core";
import "toastr/build/toastr.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faYoutube, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import MailIcon from '@material-ui/icons/Mail'
import { changeSiteLinks } from "../actions";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

const useStyles = theme => ({

});

class SettingEditorTab extends React.Component {

  handleChangeWhatsapp = e => {
    const { site, changeSiteLinks } = this.props;
    site.whatsapp = e.target.value;
    changeSiteLinks(site);
  };

  handleChangeInstagram = e => {
    const { site, changeSiteLinks } = this.props;
    site.instagram = e.target.value;
    changeSiteLinks(site);
  };

  handleChangeYoutube = e => {
    const { site, changeSiteLinks } = this.props;
    site.youtube = e.target.value;
    changeSiteLinks(site);
  };

  handleChangeMail = e => {
    const { site, changeSiteLinks } = this.props;
    site.mail = e.target.value;
    changeSiteLinks(site);
  };

  // handleClick = () => {
  //   toastr.options = {
  //     closeButton: false,
  //     debug: false,
  //     newestOnTop: true,
  //     progressBar: false,
  //     positionClass: "toast-top-right",
  //     preventDuplicates: false,
  //     onclick: null,
  //     showDuration: "300",
  //     hideDuration: "1000",
  //     timeOut: "5000",
  //     extendedTimeOut: "1000",
  //     showEasing: "swing",
  //     hideEasing: "linear",
  //     showMethod: "fadeIn",
  //     hideMethod: "fadeOut"
  //   };
  //   toastr.success("Has already changed.", "Sucess");
  // };

  render() {

    const { site } = this.props;

    return (
      <Grid container>

        <Grid container item direction="row" justify="center" xs={12} style={{ marginTop: 10 }}>
          <Grid item xs={2}>
            <FontAwesomeIcon
              icon={faWhatsapp}
              size="2x"
            />
          </Grid>
          <Grid item xs={9}>
            <TextField
              variant="outlined"
              label="WhatsApp"
              color="primary"
              size="small"
              value={site.whatsapp}
              onChange={e => this.handleChangeWhatsapp(e)}
            />
          </Grid>
        </Grid>

        <Grid container item direction="row" justify="center" xs={12} style={{ marginTop: 10 }}>
          <Grid item xs={2}>
            <FontAwesomeIcon
              icon={faInstagram}
              size="2x"
            />
          </Grid>
          <Grid item xs={9}>
            <TextField
              variant="outlined"
              label="Instagram"
              color="primary"
              size="small"
              value={site.instagram}
              onChange={e => this.handleChangeInstagram(e)}
            />
          </Grid>
        </Grid>

        <Grid container item direction="row" justify="center" xs={12} style={{ marginTop: 10 }}>
          <Grid item xs={2}>
            <FontAwesomeIcon
              icon={faYoutube}
              size="2x"
            />
          </Grid>
          <Grid item xs={9}>
            <TextField
              variant="outlined"
              label="Youtube"
              color="primary"
              size="small"
              value={site.youtube}
              onChange={e => this.handleChangeYoutube(e)}
            />
          </Grid>
        </Grid>

        <Grid container item direction="row" justify="center" xs={12} style={{ marginTop: 10 }}>
          <Grid item xs={2}>
            <MailIcon />
          </Grid>
          <Grid item xs={9}>
            <TextField
              variant="outlined"
              label="Mail"
              color="primary"
              size="small"
              value={site.mail}
              onChange={e => this.handleChangeMail(e)}
            />
          </Grid>
        </Grid>

      </Grid>
    );
  }
}
const mapStateToProps = state => ({
  site: state.site.siteEdit,
});

const mapDispatchToProps = dispatch => ({
  changeSiteLinks: site => dispatch(changeSiteLinks(site)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(useStyles)(SettingEditorTab));
