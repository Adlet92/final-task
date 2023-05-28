// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBU1rVjndAQuSRkIdmj_C5HCzTFnS3BvRQ",
  authDomain: "fir-final-task.firebaseapp.com",
  projectId: "fir-final-task",
  storageBucket: "fir-final-task.appspot.com",
  messagingSenderId: "826806933176",
  appId: "1:826806933176:web:980360fd54f69ef2fd464d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app