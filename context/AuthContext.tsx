import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebase";

interface UserType {
  email: string | null;
  uid: string | null;
}

const AuthContext = createContext({});

export const useAuthHook = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserType>({ email: null, uid: null });
  const [loading, setLoading] = useState<boolean>(true);

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        setDoc(doc(db, "users", userCredential.user.uid), {
          name: "",
          boards: [],
        });
      }
    );
  };

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    setUser({ email: null, uid: null });
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribeFromFirebase = onAuthStateChanged(auth, (userInfo) => {
      // console.log(userInfo);
      if (userInfo) {
        setUser({
          email: userInfo.email,
          uid: userInfo.uid,
        });
      } else {
        setUser({ email: null, uid: null });
      }
      setLoading(false);
    });

    return () => unsubscribeFromFirebase();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signUp, logIn, logOut }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
