import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

import { auth, db, logout, checkUser } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  //console.log(checkUser())
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    fetchUserName();
  }, [user, loading]);
  return (
    <div style={{textAlign:'center', marginTop:'5rem', fontSize:'2rem'}}>
       <div>
        Logged in as
         <div>{name}</div>
         <div>{user?.email}</div>
         <button onClick={logout}>
          Logout
         </button>
       </div>
     </div>
  );
}


