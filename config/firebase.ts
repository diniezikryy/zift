import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC342r01j0X06zvIGh-h7WfVFO0DJTwW6o",
  authDomain: "zift-14c09.firebaseapp.com",
  projectId: "zift-14c09",
  storageBucket: "zift-14c09.appspot.com",
  messagingSenderId: "438148830537",
  appId: "1:438148830537:web:a8df2c1d5ab6a86fcdb698",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();

export default firebaseConfig;
