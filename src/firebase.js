// project-855568184485

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  // signInWithEmailAndPassword,
  // createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBGwYiFLMW9Y7F3_I0U1y230wVIWLhvdcs",
  authDomain: "movie-app-c8543.firebaseapp.com",
  projectId: "movie-app-c8543",
  storageBucket: "movie-app-c8543.appspot.com",
  messagingSenderId: "855568184485",
  appId: "1:855568184485:web:79d04d8cb3d57c1f25494c",
  measurementId: "G-HJFTMC0W8R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);

    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        username: user.displayName,
        authProvider: "google",
        imageUrl: "",
        email: user.email,
      });
    }
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
}

// const logInWithEmailAndPassword = async (email, password) => {
//   try {
//     await signInWithEmailAndPassword(auth, email, password);
//   } catch (err) {
//     console.log(err);
//     alert(err.message)
//   }
// };

// const signUpWithEmailAndPassword = async (username, email, password) => {
//   try {
//     const res = await createUserWithEmailAndPassword(auth, email, password);
//     const user = res.user;
//     console.log(user);
//     await addDoc(collection(db, "users"), {
//       uid: user.uid,
//       username,
//       authProvider: "local",
//       imageUrl: "",
//       email
//     })
//   } catch (err) {
//     console.log(err);
//     alert(err.message);
//   }
// };

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.log(err);
    alert(err.message);
  }
}

const logOut = () => {
  signOut(auth);
}

export {
  auth,
  db,
  storage,
  signInWithGoogle,
  // logInWithEmailAndPassword,
  // signUpWithEmailAndPassword,
  sendPasswordReset,
  logOut
}

