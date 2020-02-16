export function openCreateNewSite() {
  return dispatch => {
    dispatch({
      type: "OPEN_CREATE_NEW_SITE"
    });
  };
}

export function closeCreateNewSite() {
  return dispatch => {
    dispatch({
      type: "CLOSE_CREATE_NEW_SITE"
    });
  };
}
