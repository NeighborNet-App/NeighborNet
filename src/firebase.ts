import "firebase/firestore";
import firebase from "firebase";
require("firebase/auth");

firebase.initializeApp({
  apiKey: "AIzaSyCfYc8koO2k2n5bWZf1vbLHD5hnAnahrX4",
  authDomain: "neighbornet-64b3f.firebaseapp.com",
  projectId: "neighbornet-64b3f",
  storageBucket: "neighbornet-64b3f.appspot.com",
  messagingSenderId: "682067984065",
  appId: "1:682067984065:web:c8552099da349f0f059e40",
});

export const firestore = firebase.firestore();
export const auth = firebase.auth();
