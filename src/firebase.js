
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

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




const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app);

export{auth,db}