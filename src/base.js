import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBz4RoHTBDf5MsdaeWb4qQy-NvQp_gm1kQ",
  authDomain: "flashcards-cb170.firebaseapp.com",
  databaseURL: "https://flashcards-cb170.firebaseio.com",
  projectId: "flashcards-cb170",
  storageBucket: "flashcards-cb170.appspot.com",
  messagingSenderId: "44448519659"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
