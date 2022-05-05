import { initializeApp } from "firebase/app";


import {GoogleAuthProvider,getAuth,signInWithPopup,signInWithEmailAndPassword,createUserWithEmailAndPassword,sendPasswordResetEmail,signOut,
setPersistence, browserSessionPersistence,FacebookAuthProvider,getRedirectResult
} from "firebase/auth";
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
  const provider = new FacebookAuthProvider();
  auth.language ='it'


  getRedirectResult(auth)
  .then((result) => {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;

    const user = result.user;
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);
    // ...
  });

  const signInWithGoogle = async () => {

    signInWithPopup(auth, googleProvider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      alert("success")
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      alert("an error occured")
      // ...
    });
    // try {
    //   const res = await signInWithPopup(auth, googleProvider);
    //   const user = res.user;
    //   const q = query(collection(db, "users"), where("uid", "==", user.uid));
    //   const docs = await getDocs(q);
    //   if (docs.docs.length === 0) {
    //     await addDoc(collection(db, "users"), {
    //       uid: user.uid,
    //       authProvider: "google",
    //       email: user.email,
    //     });
    //   }
    // } catch (err) {
    //   console.error(err);
    //   alert('An error Occured');
    // }
  };
  const logInWithEmailAndPassword = async (email, password, persist=true) => {
    //if persist == true, 
    
    if (persist) {
        await signInWithEmailAndPassword(auth, email, password).then(()=> {
          alert("successful")
        }).catch((error)=> {
          console.log(error.message);
          alert("incorrect login details");
        })
    } else {
      await setPersistence(auth, browserSessionPersistence).then(()=> {
        signInWithEmailAndPassword(auth, email, password).then(()=> {
          alert("successful")
        }).catch((error)=> {
          console.log(error.message);
          alert("incorrect login details");
        })
      }).catch((error)=> {
        console.log(error.message);
        alert("incorrect login details");
      })
    }
   
    // try {
    //   await signInWithEmailAndPassword(auth, email, password);
    // } catch (err) {
    //   console.log(err.message);
    //   alert('Incorrect login details');
    // }
  };
  const registerWithEmailAndPassword = async ( email, password) => {
    console.log("hi");
    let response = {
      status: "error"
    }
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        authProvider: "local",
        email,
      });
      return alert("success")
    } catch (err) {
      console.log(err.message);
      alert(err.message);
      return err
    }
  };

  export const checkUser = () => {
    let user = auth.currentUser;
    // console.log(user.id)
    return user ? true : false;
    }
  const sendPasswordReset = async (email) => {
    let response = {
      status: "error",
      message: ""
    }
    try {
      await sendPasswordResetEmail(auth, email);
      //alert("Password reset link sent!");
      response.status = "success"
      return response

    } catch (err) {
      // console.error(err);
      response.message = "Invalid email"
      return response
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
    signInWithPopup,
    getRedirectResult,
    logout
  };