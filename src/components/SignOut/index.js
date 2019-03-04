/**The sign out component is just a button that appears 
within the Navigation component. Since we can use the 
previously-defined authentication API to sign out a user, 
passing functionality to a button in a React component is 
fairly straightforward.*/
import React from 'react';
import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <button type="button" onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);