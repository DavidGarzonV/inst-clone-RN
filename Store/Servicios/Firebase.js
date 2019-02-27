import * as firebase from "firebase";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC6vBRfPFeSx4qRQCYWQqYSMWAblxCp0C0",
  authDomain: "inst-clone-rn.firebaseapp.com",
  databaseURL: "https://inst-clone-rn.firebaseio.com",
  projectId: "inst-clone-rn",
  storageBucket: "inst-clone-rn.appspot.com",
  messagingSenderId: "165426145510"
};
firebase.initializeApp(config);

export const autenticacion = firebase.auth();