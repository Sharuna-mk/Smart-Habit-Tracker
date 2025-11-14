// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyCZqmeUwvamGvXjj-f04uWuonaj3AY5o4E",
  authDomain: "smart-habit-tracker-550d8.firebaseapp.com",
  databaseURL: "https://smart-habit-tracker-550d8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smart-habit-tracker-550d8",
  storageBucket: "smart-habit-tracker-550d8.firebasestorage.app",
  messagingSenderId: "306574865909",
  appId: "1:306574865909:web:b0d18fda883d26299adcbc",
  measurementId: "G-HF6FSST9L9"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app);

export{auth,db}