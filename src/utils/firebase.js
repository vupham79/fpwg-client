import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCGLgfQPGsGe6c1dTall8WpghnSYtps2J8",
  authDomain: "capstoneproject1-26a40.firebaseapp.com",
  databaseURL: "https://capstoneproject1-26a40.firebaseio.com",
  projectId: "capstoneproject1-26a40",
  storageBucket: "capstoneproject1-26a40.appspot.com",
  messagingSenderId: "606766591228",
  appId: "1:606766591228:web:bf2455da477a5ada303b79",
  measurementId: "G-DB2F9V8C19"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.auth().languageCode = "en_EN";
firebase.storage().ref();
const firebaseAppAuth = firebaseApp.auth();
const provider = new firebase.auth.FacebookAuthProvider();
provider.addScope("public_profile,manage_pages,pages_show_list");
provider.setCustomParameters({
  display: "popup"
});

export { provider, firebaseAppAuth, firebase };
