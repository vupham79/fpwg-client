export const updateSiteId = id => {
  return dispatch => {
    dispatch({
      type: "UPDATE_SITE_ID",
      payload: id
    });
  };
};
