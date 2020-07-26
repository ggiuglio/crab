import * as firebase from "firebase";
import app from 'firebase/app';

import { FirebaseConfig } from "./firebaseConfig";

class Firebase {
  constructor() {
    app.initializeApp(FirebaseConfig);
    this.provider = new firebase.auth.GoogleAuthProvider()
    this.storageRef = app.storage().ref();


    this.auth = app.auth();
  }

  getCurrentUser = () => this.auth.getCurrentUser();
  googleLogin = () => this.auth.signInWithPopup(this.provider);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  onAuthStateChanged = () => this.auth.onAuthStateChanged();

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}

export default Firebase;
