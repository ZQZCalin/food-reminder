import { createContext, useContext, useEffect, useState } from "react";
import css from "../styles/Login.module.css";
import firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import { UserDataContext } from "../utils/data";
import { useHistory, useLocation } from "react-router-dom";

// initialize firebase
firebase.initializeApp({
  apiKey: "AIzaSyBB3M2bTBga_ZlUO_Y266AIZwUS5emMmCM",
  authDomain: "food-reminder-e1c8b.firebaseapp.com",
  projectId: "food-reminder-e1c8b",
  storageBucket: "food-reminder-e1c8b.appspot.com",
  messagingSenderId: "209486423857",
  appId: "1:209486423857:web:ae03d94e05722b23a37210"
});
export const auth = firebase.auth();
export const db = firebase.firestore();

export const AuthContext = createContext();

function AuthContextProvider(props) {

  // context
  const history = useHistory();
  const { userData, setUserData, setCurrentUser } = useContext(UserDataContext);

  // login
  const login = (email, password) => {
    auth.signInWithEmailAndPassword(email, password)
      // .then(() => {
      //   history.push('/home');  // caveat: only redirect once!
      // })
      .catch(error => {
        alert("Login Error: " + error);
      });
  };

  // sign up


  // user status listener
  // caveat: onAuthStateChanged refreshes and triggers all the time
  const unsubscribe = auth.onAuthStateChanged(user => {
    if (user && !userData) {
      // fetch data
      db.collection('users')
        .where('userId', '==', user.uid)
        .get()
        .then(snapshot => {
          snapshot.docs[0].ref.collection('items')
            .get()
            .then(snapshot => {
              setCurrentUser(user.uid);
              setUserData(snapshot.docs.map(doc => doc.data()));
              history.push('./home');
            });
        })
        .catch(error => {
          alert("Database Error: " + error);
        });
    } else if (!user && userData) {
      setUserData(null);  // clear data when logged out
    }
  });

  useEffect(() => {
    let timer = setTimeout(() => {
      if (!userData) {
        history.push('./login');
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [userData]);

  return (
    <AuthContext.Provider value={{
      login,
    }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;