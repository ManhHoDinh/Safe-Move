// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8gXS8VDJEZZUAPPTX3gs7uoeJFYd20mI",
  authDomain: "safemove-c9cc7.firebaseapp.com",
  projectId: "safemove-c9cc7",
  storageBucket: "safemove-c9cc7.appspot.com",
  messagingSenderId: "37639270309",
  appId: "1:37639270309:web:82ee545ae1066cf159824c",
  measurementId: "G-HWKP0ZSZ6N",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase Auth provider
const provider = new GoogleAuthProvider();

// whenever a user interacts with the provider, we force them to select an account
provider.setCustomParameters({
  prompt: "select_account ",
});
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
