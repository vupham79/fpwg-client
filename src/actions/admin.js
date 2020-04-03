import toastr from "../component/Toastr";
import axios from "../utils/axios";
import { firebase } from "../utils/firebase";

export function loginAdmin({ username, password }) {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        method: "POST",
        url: "/admin/login",
        data: {
          username,
          password
        }
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
        dispatch({
          type: "SET_LOGIN_ADMIN",
          payload: {
            username,
            password
          }
        });
        return true;
      } else {
        toastr.error(`Incorrect username or password`, "Error");
      }
      return false;
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING"
      });
      toastr.error(`Login failed!`, "Error");
    } finally {
      return false;
    }
  };
}

export function setLogoutAdmin() {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    dispatch({
      type: "SET_LOGOUT_ADMIN"
    });
    try {
      await axios({
        url: "/admin/logout"
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING"
      });
    }
  };
}

export function getAllCategoriesAdmin() {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const data = await axios({
        url: "/category/findAll"
      });
      dispatch({
        type: "CLOSE_LOADING"
      });
      if (data.status === 200) {
        dispatch({
          type: "SET_ALL_CATEGORIES",
          payload: data.data
        });
      } else {
        toastr.error(`Unable to get categories`, "Error");
      }
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING"
      });
      toastr.error(`Unable to get categories`, "Error");
    }
  };
}

export function updateCategory(id, name, picture) {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      let upload = false;
      if (picture && typeof picture !== "string") {
        console.log(picture);
        upload = await uploadPicture(picture, name);
        if (upload) {
          console.log(upload);
          await axios({
            method: "PATCH",
            url: `/category/update/${id}`,
            data: {
              name,
              picture: upload
            }
          });
          dispatch({
            type: "CLOSE_LOADING"
          });
          toastr.success(`Update category success`, "Success");
        }
      } else {
        console.log("picture: ", picture);
        await axios({
          method: "PATCH",
          url: `/category/update/${id}`,
          data: {
            name,
            picture
          }
        });
        dispatch({
          type: "CLOSE_LOADING"
        });
        toastr.success(`Update category success`, "Success");
      }
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING"
      });
      toastr.error(`Update category failed`, "Error");
    }
  };
}

export function insertCategory(name, picture) {
  return async dispatch => {
    dispatch({
      type: "SHOW_LOADING"
    });
    try {
      const upload = await uploadPicture(picture, name);
      if (upload) {
        const data = await axios({
          method: "POST",
          url: `/category/insert`,
          data: {
            name,
            picture: upload
          }
        });
        dispatch({
          type: "CLOSE_LOADING"
        });
        if (data.status === 200) {
          toastr.success(`Insert category success`, "Success");
        } else {
          toastr.error(`Insert category failed`, "Error");
        }
      } else {
        dispatch({
          type: "CLOSE_LOADING"
        });
      }
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING"
      });
      toastr.error(`Insert category failed`, "Error");
    }
  };
}

export function uploadPicture(file, category) {
  return new Promise(async (resolve, reject) => {
    try {
      if (file && typeof file === "object" && file.size > 0) {
        firebase
          .storage()
          .ref(`category/`)
          .child(`${category}`)
          .put(file, {
            contentType: "image/jpeg"
          })
          .then(async () => {
            console.log("up");
            firebase
              .storage()
              .ref(`category/`)
              .child(`${category}`)
              .getDownloadURL()
              .then(async url => {
                resolve(url);
              });
          })
          .catch(error => {
            console.log("upload: ", error);
            toastr.error(`Upload picture failed`, "Error");
            resolve(false);
          });
      } else resolve(false);
    } catch (error) {
      toastr.error(`Upload picture failed`, "Error");
      resolve(false);
    }
  });
}
