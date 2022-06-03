// import * as firebase from '@firebase/app';
import * as firebase from "firebase";

import "firebase/auth";
import "firebase/firestore";
// require('firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyCPl313Wf3-Gwc0qHGsWoGAJgZaDZeCqY8",
  authDomain: "todo-d3f46.firebaseapp.com",
  projectId: "todo-d3f46",
  storageBucket: "todo-d3f46.appspot.com",
  messagingSenderId: "918690243025",
  appId: "1:918690243025:web:20b0d2961948850fdbc0f0",
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
