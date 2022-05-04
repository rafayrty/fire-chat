// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {

  apiKey: "AIzaSyCy6pn5n_sxXwITVdFPwvmwKPiwQv5wQG4",

  authDomain: "chat-79fff.firebaseapp.com",

  projectId: "chat-79fff",
  databaseURL:'https://chat-79fff-default-rtdb.asia-southeast1.firebasedatabase.app',
  storageBucket: "chat-79fff.appspot.com",

  messagingSenderId: "250456152198",

  appId: "1:250456152198:web:d5829286d151b373bdd907"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);


const database = getDatabase(app);

export default database;