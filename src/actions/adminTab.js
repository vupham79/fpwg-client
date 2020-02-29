export function updateAdminTabIndex(index) {
  return dispatch => {
    dispatch({
      type: "UPDATE_ADMIN_INDEX",
      payload: index
    });
  };
}
