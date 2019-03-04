/** This connects the Firebase with the React world 
using  React’s Context API to provide a Firebase instance 
once at the top-level of your component hierarchy. 

The createContext() function essentially creates two components..
a FirebaseContext.Provider component (is used to provide a Firebase
instance once at the top-level of your React component tree)& a 
FirebaseContext.Consumer component (used to retrieve the Firebase 
instance if it is needed in the React component)*/


import React from 'react';

const FirebaseContext = React.createContext(null);

export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default FirebaseContext;