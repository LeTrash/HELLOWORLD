import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB4kl3KvTnwhtclaGn_VRpd0XSDcEdTgVY",
  authDomain: "byu-i-comments.firebaseapp.com",
  databaseURL: "https://byu-i-comments-default-rtdb.firebaseio.com",
  projectId: "byu-i-comments",
  storageBucket: "byu-i-comments.appspot.com",
  messagingSenderId: "382567625734",
  appId: "1:382567625734:web:b91b4ba5eb3a0924883f87",
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const responseRef = ref(database, "responses");

// const responseRef = database.ref(database, "responses");

export default responseRef;
