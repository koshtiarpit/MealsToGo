import React, { createContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { loginRequest, registerRequest } from "./authentication.service";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const auth = getAuth();
  onAuthStateChanged(auth, (u) => {
    if (u) {
      setUser(u);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
    });
  };

  const onLogin = (email, password) => {
    setIsLoading(true);
    setError(null);
    loginRequest(auth, email, password)
      .then((u) => {
        console.log(u);
        setUser(u);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
        setError(e.toString());
      });
  };

  const onRegister = (email, password, repeatPassword) => {
    if (password !== repeatPassword) {
      setError("Error: Password do not match");
      return;
    }
    setIsLoading(true);
    setError(null);
    registerRequest(auth, email, password)
      .then((u) => {
        console.log(u);
        setIsLoading(false);
        setUser(u);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
        setError(e.toString());
      });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
