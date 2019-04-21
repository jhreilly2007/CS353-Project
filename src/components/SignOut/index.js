/**The sign out component is just a button that appears 
within the Navigation component. Since we can use the 
previously-defined authentication API to sign out a user, 
passing functionality to a button in a React component is 
fairly straightforward.*/
import React from 'react';
import { withFirebase } from '../Firebase';
import { Panel, FormLabel} from 'react-bootstrap';

const SignOutButton = ({ firebase }) => (
  <button style={{background:'#d5e1df',
  				color:'white', 
  				display:'block', 
  				padding:'14px, 16px', 
  				fontSize:'22px', 
  				textAlign:'center',
  				cursor:'pointer',
  				fontFamily:'Lato,Arial,Helvetica,sans-serif',
  				lineHeight: '1.4285em',
  				borderRadius:'5px'

    			}} type="button" onClick={firebase.doSignOut}>Sign Out </button>
);

export default withFirebase(SignOutButton);