  /** Import firebase from the library installed earlier 
  (npm install firebase), and then use it within a new Firebase 
  class to initialize firebase with the configuration:import app 
  from 'firebase/app'. Note:Firebase should only be initialized 
  once in the application (;*/

import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
/**configuration from your Firebase project’s dashboard 
on firebase website*/
  const config = {
    apiKey: "AIzaSyCsh71n9W66ThYOjcFPkfBC0yrClyD4W9g",
    authDomain: "podcast-app-a50a5.firebaseapp.com",
    databaseURL: "https://podcast-app-a50a5.firebaseio.com",
    projectId: "podcast-app-a50a5",
    storageBucket: "podcast-app-a50a5.appspot.com",
    messagingSenderId: "594290863646"
  };

  class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
  }
  /**define all the authentication functions as class methods
  These will serve our communication from the Firebase 
  class to the Firebase API*/

   // *** Auth API ***

   /**sign up function (registration) takes email and password 
   parameters for its function signature and uses an official Firebase 
   API endpoint to create a user:*/

   doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    //login/sign-in function, which takes email and password parameters, as well
   doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

   doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

   doSignOut = () => this.auth.signOut();

   //authentication methods to reset and change a password for an authenticated user
   doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

   doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);
}

export default Firebase;