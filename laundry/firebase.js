import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { apiKey, authDomain, storageBucket, messagingSenderId} from "@env";

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: "laundry-app-9e5a4",
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: "1:1042349287662:web:7b43c4baccb58e6bd02bff",
  measurementId: "G-FL1YZ01GGD",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore();

export { auth, db };
