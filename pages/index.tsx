import type { NextPage } from "next";
import React, { useEffect } from "react";
import Router from "next/router";
import { useAuthHook } from "../context/AuthContext";

const Home: NextPage = () => {
  const { user } = useAuthHook();
  const { pathname } = Router;

  useEffect(() => {
    if (!user.uid) {
      Router.push("/login");
    }

    if (pathname === "/" && user.uid != undefined) {
      Router.push(`/${user.uid}/dashboard`);
    }
  }, []);

  return (
    <div>
      <h1>Pushing you to dashboard...</h1>
    </div>
  );
};

export default Home;
