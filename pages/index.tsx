import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Router from "next/router";
import { useAuthHook } from "../context/AuthContext";
import { auth, db } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

const Home: NextPage = () => {
  const { user } = useAuthHook();
  const { pathname } = Router;

  const handleLogout = () => {
    signOut(auth);
  };

  useEffect(() => {
    if (!user.uid) {
      Router.push("/login");
    }

    if (user.uid) {
      Router.push(`/${user.uid}/dashboard`);
    }
  }, []);

  return (
    <div>
      <h1>
        Welcome!{" "}
        {!user.id ? <span>{user.uid}</span> : <span>Not logged in</span>}
      </h1>
      <button onClick={handleLogout}>Signout</button>
    </div>
  );
};

export default Home;
