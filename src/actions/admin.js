import toastr from "../component/Toastr";
import axios from "../utils/axios";
export function loginAdmin({ username, password }) {
  return async dispatch => {
    try {
      const data = await axios({
        url: "/admin/login",
        data: {
          username: username,
          password: password,
        }
      });

      if (data.status === 200) {
        dispatch({
          type: "SET_LOGIN_ADMIN",
          payload: {
            username,
            password
          }
        });
      } else {
        toastr.error(`Incorrect username or password`, "Error");
      }
    } catch (error) {
      toastr.error(`Incorrect username or password`, "Error");
    }

  };
}

export function setLogoutAdmin() {
  return dispatch => {
    dispatch({
      type: "SET_LOGOUT"
    });
  };
}