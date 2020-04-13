import toastr from "../component/Toastr";
import axios from "../utils/axios";
import { firebase } from "../utils/firebase";

export function loginAdmin({ username, password }) {
  return async (dispatch) => {
    dispatch({
      type: "SHOW_LOADING",
    });
    try {
      const data = await axios({
        method: "POST",
        url: "/admin/login",
        data: {
          username,
          password,
        },
      });
      dispatch({
        type: "CLOSE_LOADING",
      });
      if (data.status === 200) {
        dispatch({
          type: "SET_LOGIN_ADMIN",
          payload: {
            username,
            password,
          },
        });
        return true;
      } else {
        toastr.error(`Incorrect username or password`, "Error");
      }
      return false;
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING",
      });
      toastr.error(`Login failed!`, "Error");
    } finally {
      return false;
    }
  };
}

export function setLogoutAdmin() {
  return async (dispatch) => {
    dispatch({
      type: "SHOW_LOADING",
    });
    dispatch({
      type: "SET_LOGOUT_ADMIN",
    });
    try {
      await axios({
        url: "/admin/logout",
      });
      dispatch({
        type: "CLOSE_LOADING",
      });
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING",
      });
    }
  };
}

export function getAllCategoriesAdmin() {
  return async (dispatch) => {
    dispatch({
      type: "SHOW_LOADING",
    });
    try {
      const data = await axios({
        url: "/category/findAll",
      });
      dispatch({
        type: "CLOSE_LOADING",
      });
      if (data.status === 200) {
        dispatch({
          type: "SET_ALL_CATEGORIES",
          payload: data.data,
        });
      } else {
        toastr.error(`Unable to get categories`, "Error");
      }
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING",
      });
      toastr.error(`Unable to get categories`, "Error");
    }
  };
}

export function updateCategory(id, name, picture) {
  return async (dispatch) => {
    dispatch({
      type: "SHOW_LOADING",
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
              picture: upload,
            },
          });
          dispatch({
            type: "CLOSE_LOADING",
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
            picture,
          },
        });
        dispatch({
          type: "CLOSE_LOADING",
        });
        toastr.success(`Update category success`, "Success");
      }
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING",
      });
      toastr.error(`Update category failed`, "Error");
    }
  };
}

export function insertCategory(name, picture) {
  return async (dispatch) => {
    dispatch({
      type: "SHOW_LOADING",
    });
    try {
      const upload = await uploadPicture(picture, name);
      if (upload) {
        const data = await axios({
          method: "POST",
          url: `/category/insert`,
          data: {
            name,
            picture: upload,
          },
        });
        dispatch({
          type: "CLOSE_LOADING",
        });
        if (data.status === 200) {
          toastr.success(`Insert category success`, "Success");
        } else {
          toastr.error(`Insert category failed`, "Error");
        }
      } else {
        dispatch({
          type: "CLOSE_LOADING",
        });
      }
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING",
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
            contentType: "image/jpeg",
          })
          .then(async () => {
            firebase
              .storage()
              .ref(`category/`)
              .child(`${category}`)
              .getDownloadURL()
              .then(async (url) => {
                resolve(url);
              });
          })
          .catch((error) => {
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

export function uploadPictureTheme(file, name) {
  return new Promise(async (resolve, reject) => {
    try {
      if (file && typeof file === "object" && file.size > 0) {
        firebase
          .storage()
          .ref(`theme/`)
          .child(`${name}`)
          .put(file, {
            contentType: "image/jpeg",
          })
          .then(async () => {
            firebase
              .storage()
              .ref(`theme/`)
              .child(`${name}`)
              .getDownloadURL()
              .then(async (url) => {
                resolve(url);
              });
          })
          .catch((error) => {
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

export function updateTheme(
  id,
  name,
  fontTitle,
  fontBody,
  color,
  previewImage,
  category,
  isOnePage
) {
  return async (dispatch) => {
    dispatch({
      type: "SHOW_LOADING",
    });
    try {
      let upload = false;
      if (previewImage && typeof previewImage !== "string") {
        upload = await uploadPictureTheme(previewImage, name);
        if (upload) {
          console.log(upload);
          await axios({
            method: "PATCH",
            url: `/theme/update/${id}`,
            data: {
              name,
              fontTitle,
              fontBody,
              color,
              previewImage: upload,
              category,
              isOnePage,
            },
          });
          dispatch({
            type: "CLOSE_LOADING",
          });
          toastr.success(`Update theme success`, "Success");
        }
      } else {
        await axios({
          method: "PATCH",
          url: `/theme/update/${id}`,
          data: {
            name,
            fontTitle,
            fontBody,
            color,
            previewImage,
            category,
            isOnePage,
          },
        });
        dispatch({
          type: "CLOSE_LOADING",
        });
        toastr.success(`Update theme success`, "Success");
      }
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING",
      });
      toastr.error(`Update theme failed`, "Error");
    }
  };
}

export function insertTheme(
  name,
  fontTitle,
  fontBody,
  mainColor,
  previewImage,
  category,
  isOnePage
) {
  return async (dispatch) => {
    dispatch({
      type: "SHOW_LOADING",
    });
    try {
      const upload = await uploadPictureTheme(previewImage, name);
      if (upload) {
        const data = await axios({
          method: "POST",
          url: `/theme/insert`,
          data: {
            name,
            fontTitle,
            fontBody,
            mainColor,
            previewImage: upload,
            category,
            isOnePage,
          },
        });
        dispatch({
          type: "CLOSE_LOADING",
        });
        if (data.status === 200) {
          toastr.success(`Insert theme success`, "Success");
        } else {
          toastr.error(`Insert theme failed`, "Error");
        }
      } else {
        dispatch({
          type: "CLOSE_LOADING",
        });
        toastr.error(`Invalid preview image leads to insert failed`, "Error");
      }
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING",
      });
      toastr.error(`Insert theme failed`, "Error");
    }
  };
}

export function deleteCategory(id) {
  return async (dispatch) => {
    dispatch({
      type: "SHOW_LOADING",
    });
    try {
      const result = await axios({
        method: "DELETE",
        url: `/category/delete/${id}`,
      });
      dispatch({
        type: "CLOSE_LOADING",
      });
      if (result.status === 200) {
        toastr.success(`Delete category success`, "Success");
      } else {
        toastr.error(`Delete category failed`, "Error");
      }
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING",
      });
      toastr.error(`Delete category failed`, "Error");
    }
  };
}

export function deleteTheme(id) {
  return async (dispatch) => {
    dispatch({
      type: "SHOW_LOADING",
    });
    try {
      const result = await axios({
        method: "DELETE",
        url: `/theme/delete/${id}`,
      });
      dispatch({
        type: "CLOSE_LOADING",
      });
      if (result.status === 200) {
        toastr.success(`Delete theme success`, "Success");
      } else {
        toastr.error(`Delete theme failed`, "Error");
      }
    } catch (error) {
      dispatch({
        type: "CLOSE_LOADING",
      });
      toastr.error(`Delete theme failed`, "Error");
    }
  };
}
