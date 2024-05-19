const firebaseConfig = {
  apiKey: "AIzaSyBN4S6dsrIljz6YDHrcY-6upgu4BkMUe68",
  authDomain: "session-hijacking-attack.firebaseapp.com",
  databaseURL: "https://session-hijacking-attack-default-rtdb.firebaseio.com/",
  projectId: "session-hijacking-attack",
  storageBucket: "session-hijacking-attack.appspot.com",
  messagingSenderId: "799601126948",
  appId: "1:799601126948:web:c9eec3c3ac276c72d5f2b1",
  measurementId: "G-V30JDN3LCF",
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
