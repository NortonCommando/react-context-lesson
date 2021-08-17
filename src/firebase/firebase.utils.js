import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyClg2hA4vqr5pDv76l-Xo9uC0aFhHaqOsw",
  authDomain: "crwn-react-db-c3158.firebaseapp.com",
  projectId: "crwn-react-db-c3158",
  storageBucket: "crwn-react-db-c3158.appspot.com",
  messagingSenderId: "168872814340",
  appId: "1:168872814340:web:01f5ee8d3cfade21d69251",
  measurementId: "G-CZFHG88JV5",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
