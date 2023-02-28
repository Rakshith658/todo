// import * as firebase from '@firebase/app';
import * as firebase from "firebase";

import "firebase/auth";
import "firebase/firestore";
// require('firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyA00WPoAret_VIUvq2gBfqffvwD09iQvFw",
  authDomain: "todo-fd3b1.firebaseapp.com",
  projectId: "todo-fd3b1",
  storageBucket: "todo-fd3b1.appspot.com",
  messagingSenderId: "777488664606",
  appId: "1:777488664606:web:908d0838517ba1dcfa460f",
};

let app;

if (firebase.default.apps.length === 0) {
  app = firebase.default.initializeApp(firebaseConfig);
} else {
  app = firebase.default.app;
}

const db = app.firestore();
const auth = firebase.default.auth();

export { db, auth };
