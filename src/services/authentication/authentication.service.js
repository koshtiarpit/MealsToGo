import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// admin@test.com - admin@123
export const loginRequest = (auth, email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const registerRequest = (auth, email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
