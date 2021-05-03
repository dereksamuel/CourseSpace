import firebase from "firebase";
import "firebase/auth";

let firebaseConfig = {
  apiKey: "AIzaSyBlPmy0W9rUObFPAR7EnrDlM-1jbQCadCs",
  authDomain: "coursespace-2e289.firebaseapp.com",
  projectId: "coursespace-2e289",
  storageBucket: "coursespace-2e289.appspot.com",
  messagingSenderId: "106552977104",
  appId: "1:106552977104:web:865cf73541948decdee0d5",
  measurementId: "G-LZV3FSZGPW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const settings = {
  timestampsInSnapshots: true,
};
const database = firebase.firestore();
database.settings(settings);

export const db = database;

export let storage = firebase.storage();

export default firebase;
