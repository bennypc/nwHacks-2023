import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAOyXCk1hawDzrc_XDlDb2Ap757gyXO_1E",
  authDomain: "nwhacks2023-5f0e8.firebaseapp.com",
  projectId: "nwhacks2023-5f0e8",
  storageBucket: "nwhacks2023-5f0e8.appspot.com",
  messagingSenderId: "780976112459",
  appId: "1:780976112459:web:df585b24b3ac54e530dece",
  measurementId: "G-VGN148B38Q",
  storageBucket: "gs://nwhacks2023-5f0e8.appspot.com",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
const storage = getStorage(app);
export default storage;

const provider = new GoogleAuthProvider();

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoUrl;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
    })
    .catch((error) => {
      console.log(error);
    });
};
