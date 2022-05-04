import { initializeApp } from "firebase/app";


import {GoogleAuthProvider,getAuth,signInWithPopup,signInWithEmailAndPassword,createUserWithEmailAndPassword,sendPasswordResetEmail,signOut} from "firebase/auth";
import{getFirestore,query,getDocs,collection,where,addDoc} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBCQU9g_s1hJB2MMejLnvUizuqsE30T8F4",
    authDomain: "my-first-firebase-proj-3a841.firebaseapp.com",
    projectId: "my-first-firebase-proj-3a841",
    storageBucket: "my-first-firebase-proj-3a841.appspot.com",
    messagingSenderId: "813999999631",
    appId: "1:813999999631:web:3940e1b981bc3c2d8c7efa",
    measurementId: "G-D35T1DR60M"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
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
          authProvider: "google",
          email: user.email,
        });
      }
    } catch (err) {
      console.error(err);
      alert('An error Occured');
    }
  };
  const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert('This account does not exist please Sign up');
    }
  };
  const registerWithEmailAndPassword = async ( email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert('An error occured');
    }
  };
  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert('An error occured');
    }
  };
  const logout = () => {
    signOut(auth);
  };
  export {
    auth,
    db,
    signInWithGoogle,
    signInWithEmailAndPassword,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
  };