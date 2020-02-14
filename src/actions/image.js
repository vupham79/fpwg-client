export function getImageUrl(url) {
  return dispatch => {
    dispatch({
      type: "GET_IMAGE_URL",
      payload: url
    });
  };
}
