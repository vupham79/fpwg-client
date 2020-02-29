import axios from "../utils/axios";
import toastr from "toastr";

export function getAllPaths() {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        url: "/sitePath/findAll"
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
        dispatch({
          type: "SET_ALL_PATHS",
          payload: data.data
        });
      } else {
        toastr.error(`Unable to retrieve paths`, "Error");
      }
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING"
      });
      toastr.error(`Unable to retrieve themes`, "Error");
    }
  };
}
