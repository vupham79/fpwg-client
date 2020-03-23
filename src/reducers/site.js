const defaultState = {
  currentId: null,
  data: [],
  isEdit: false,
  siteEdit: null,
  siteView: null,
  currentEditId: null,
  titleEdit: {},
  bodyEdit: {},
  titleView: {},
  bodyView: {},
  isView: false,
  adminData: [],
  colorPallete: null,
  navItemIsActive: false,
  newLogo: null,
  newCover: [],
  isPreview: false,
  isChanged: false,
  youtube: null,
  instagram: null,
  sitepath: null,
  phone: null,
  email: null,
  whatsapp: null
};

let index;
let convertAutoSyncValue;

const SiteReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_EDIT_ON":
      return {
        ...state,
        isEdit: true
      };
    case "SET_EDIT_OFF":
      return {
        ...state,
        isEdit: false
      };
    case "CLEAR_SITE_VIEW":
      return {
        ...state,
        siteView: null
      };
    case "SET_USER_SITES":
      return {
        ...state,
        data: action.payload ? [...action.payload] : []
      };
    case "SET_ALL_SITES":
      return {
        ...state,
        adminData: action.payload ? [...action.payload] : []
      };
    case "UPDATE_SITE_ID":
      return {
        ...state,
        currentId: action.payload
      };
    case "PUBLISH_SITE":
      index = state.data.findIndex(site => site.id === action.payload);
      state.data[index].isPublish = true;
      return {
        ...state,
        data: [...state.data],
        siteEdit: {
          ...state.siteEdit,
          isPublish: true
        }
      };
    case "UNPUBLISH_SITE":
      index = state.data.findIndex(site => site.id === action.payload);
      state.data[index].isPublish = false;
      return {
        ...state,
        data: [...state.data],
        siteEdit: {
          ...state.siteEdit,
          isPublish: false
        }
      };
    case "PUBLISH_SITE_ADMIN":
      index = state.adminData.findIndex(site => site.id === action.payload);
      state.adminData[index].isPublish = true;
      return {
        ...state,
        adminData: [...state.adminData]
      };
    case "UNPUBLISH_SITE_ADMIN":
      index = state.adminData.findIndex(site => site.id === action.payload);
      state.adminData[index].isPublish = false;
      return {
        ...state,
        adminData: [...state.adminData]
      };
    case "GET_ALL_SITE":
      return {
        ...state,
        data: [...action.payload]
      };
    case "CREATE_NEW_SITE_SUCCESS":
      return {
        ...state,
        data: [action.payload]
      };
    case "CHANGE_COLOR":
      const color = {
        fontFamily: action.payload.fontTitle,
        color: action.payload.color
      };
      return {
        ...state,
        siteEdit: { ...action.payload },
        titleEdit: { ...color }
      };
    case "CHANGE_FONT_TITLE":
      const fontTitle = {
        fontFamily: action.payload.fontTitle,
        color: action.payload.color
      };
      return {
        ...state,
        siteEdit: { ...action.payload },
        titleEdit: { ...fontTitle }
      };
    case "CHANGE_FONT_BODY":
      const fontBody = {
        fontFamily: action.payload.fontBody
      };
      return {
        ...state,
        siteEdit: { ...action.payload },
        bodyEdit: { ...fontBody }
      };
    case "CHANGE_NAV_ITEMS":
      return {
        ...state,
        siteEdit: { ...action.payload }
      };
    case "CHANGE_HOME_ITEMS":
      return {
        ...state,
        siteEdit: { ...action.payload }
      };
    case "CHANGE_THEME":
      const newColor = {
        fontFamily: action.payload.fontTitle,
        color: action.payload.color
      };
      return {
        ...state,
        siteEdit: { ...action.payload },
        titleEdit: { ...newColor },
        isChanged: true
      };
    case "SET_LOGOUT":
      return {
        ...defaultState
      };
    case "SET_SITE_EDIT":
      if (action.payload) {
        if (action.payload.minute) {
          convertAutoSyncValue = `${action.payload.minute}min`;
        }
        if (action.payload.hour) {
          convertAutoSyncValue = `${action.payload.hour}hr`;
        }
        if (action.payload.day) {
          convertAutoSyncValue = "daily";
        }
      }
      return {
        ...state,
        isEdit: true,
        siteEdit: {
          ...action.payload.data,
          autoSync: {
            ...action.payload.data.autoSync,
            convertAutoSyncValue
          }
        },
        titleEdit: { ...action.payload.titleEdit },
        bodyEdit: { ...action.payload.bodyEdit },
        newLogo: null,
        newCover: action.payload.data.cover
          ? [...action.payload.data.cover]
          : [],
        youtube: action.payload.data.youtube,
        sitepath: action.payload.data.sitePath,
        whatsapp: action.payload.data.whatsapp,
        phone: action.payload.data.phone,
        instagram: action.payload.data.instagram,
        email: action.payload.data.email
      };
    case "SET_SITE_VIEW":
      return {
        ...state,
        isEdit: false,
        siteView: { ...action.payload.data },
        titleView: { ...action.payload.titleView },
        bodyView: { ...action.payload.bodyView }
      };
    case "SET_CURRENT_EDIT_ID":
      return {
        ...state,
        currentEditId: action.payload
      };
    case "SET_ACTIVE_NAV_ITEMS":
      return {
        ...state,
        siteEdit: { ...action.payload }
      };
    case "CHANGE_SITE_TITLE":
      return {
        ...state,
        siteEdit: { ...action.payload }
      };
    case "CHANGE_SITE_LINKS":
      return {
        ...state,
        siteEdit: { ...action.payload }
      };
    case "UPLOAD_LOGO":
      return {
        ...state,
        siteEdit: { ...action.payload }
      };
    case "UPLOAD_FAVICON":
      return {
        ...state,
        siteEdit: { ...action.payload }
      };
    case "SET_COLOR_PALLETE":
      return {
        ...state,
        colorPallete: action.payload
      };
    case "SET_NAV_ITEM_INACTIVE":
      return {
        ...state,
        navItemIsActive: false
      };
    case "SET_NAV_ITEM_ACTIVE":
      return {
        ...state,
        navItemIsActive: true
      };
    case "SET_NEW_LOGO":
      return {
        ...state,
        newLogo: action.payload
      };
    case "SET_NEW_COVER":
      let array = [...state.newCover, action.payload];
      return {
        ...state,
        newCover: [...array]
      };
    case "SET_PREVIEW_MODE":
      return {
        ...state,
        isPreview: action.payload
      };
    case "REMOVE_COVER":
      const img = action.payload;
      const filter = state.newCover.filter(cover => {
        if (typeof img === "object") {
          return cover.name !== img.name;
        } else {
          return cover !== img;
        }
      });
      return {
        ...state,
        newCover: [...filter]
      };
    case "CHANGE_NAV_ITEM_NAME":
      return {
        ...state,
        siteEdit: { ...action.payload }
      };
    case "CHANGE_HOME_ITEM_NAME":
      return {
        ...state,
        siteEdit: { ...action.payload }
      };
    case "CHANGE_SITE_SITEPATH":
      return {
        ...state,
        sitepath: action.payload
      };
    case "CHANGE_SITE_WHATSAPP":
      return {
        ...state,
        whatsapp: action.payload
      };
    case "CHANGE_SITE_INSTAGRAM":
      return {
        ...state,
        instagram: action.payload
      };
    case "CHANGE_SITE_YOUTUBE":
      return {
        ...state,
        youtube: action.payload
      };
    case "CHANGE_SITE_EMAIL":
      return {
        ...state,
        email: action.payload
      };
    case "CHANGE_SITE_PHONE":
      return {
        ...state,
        phone: action.payload
      };
    case "SET_SITEVIEW_ABOUT":
      return {
        ...state,
        siteView: {
          ...state.siteView,
          about: action.payload
        }
      };
    case "SET_SITEEDIT_EVENTS":
      return {
        ...state,
        siteView: {
          ...state.siteEdit,
          events: action.payload
        }
      };
    case "SET_SITEVIEW_EVENTS":
      return {
        ...state,
        siteView: {
          ...state.siteView,
          events: action.payload
        }
      };
    case "SET_SITEVIEW_GALLERIES":
      return {
        ...state,
        siteView: {
          ...state.siteView,
          galleries: action.payload
        }
      };
    case "SET_SITEEDIT_GALLERIES":
      return {
        ...state,
        siteEdit: {
          ...state.siteEdit,
          galleries: action.payload
        }
      };
    case "SET_SITEVIEW_NEWS":
      return {
        ...state,
        siteView: {
          ...state.siteView,
          posts: action.payload
        }
      };
    case "SET_SITEEDIT_NEWS":
      return {
        ...state,
        siteEdit: {
          ...state.siteEdit,
          posts: action.payload
        }
      };
    case "SET_SITEVIEW_CONTACT":
      return {
        ...state,
        siteView: {
          ...state.siteView,
          ...action.payload
        }
      };
    case "SET_AUTO_SYNC":
      if (action.payload) {
        if (action.payload.minute) {
          convertAutoSyncValue = `${action.payload.minute}min`;
        }
        if (action.payload.hour) {
          convertAutoSyncValue = `${action.payload.hour}hr`;
        }
        if (action.payload.day) {
          convertAutoSyncValue = "daily";
        }
      }
      return {
        ...state,
        siteEdit: {
          ...state.siteEdit,
          autoSync: {
            ...action.payload,
            convertAutoSyncValue
          }
        }
      };
    default:
      return state;
  }
};

export default SiteReducer;
