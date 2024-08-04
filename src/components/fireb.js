import { initializeApp, auth } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC2YMy095m2EJdE6Zg4MVb7JXqLKM8EW2Y",
  authDomain: "billinginv-78309.firebaseapp.com",
  projectId: "billinginv-78309",
  storageBucket: "billinginv-78309.appspot.com",
  messagingSenderId: "78167947791",
  appId: "1:78167947791:web:f4695c7d5a25ca0f91417a",
  measurementId: "G-SJ1BGYHR12"
};

const app = initializeApp(firebaseConfig);