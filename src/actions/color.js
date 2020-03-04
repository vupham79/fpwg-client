export function setColorPallete(pallete) {
  return dispatch => {
    dispatch({
      type: "SET_COLOR_PALLETE",
      payload: pallete
    });
  };
}
