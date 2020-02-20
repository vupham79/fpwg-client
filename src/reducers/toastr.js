const defaultState = {
  title: "",
  content: "",
  option: {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-top-right",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "2000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
  }
};

const ToastrReducer = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default ToastrReducer;
