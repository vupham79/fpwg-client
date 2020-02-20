import React from "react";
import { Button } from "@material-ui/core";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

class SettingEditorTab extends React.Component {
  handleClick = () => {
    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: true,
      progressBar: false,
      positionClass: "toast-top-right",
      preventDuplicates: false,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut"
    };
    toastr.success("Has already changed.", "Sucess");
  };

  render() {
    return <Button onClick={this.handleClick}>click</Button>;
  }
}

export default SettingEditorTab;
