
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDbXwi9v1i-LNiq5Zu1plqenwNQPOT_4P8",
  authDomain: "passgen-64d37.firebaseapp.com",
  projectId: "passgen-64d37",
  storageBucket: "passgen-64d37.appspot.com",
  messagingSenderId: "16040115306",
  appId: "1:16040115306:web:0f7c2abd7c05c4ea685e13",
  measurementId: "G-HFDE6Y7RGR"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
