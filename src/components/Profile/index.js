/** protected account page!!
 The Account page serves as the central place for users to 
 manage their account, where it shows the PasswordChangeForm 
 and PasswordResetForm, accessible by a standalone route.

 The Account page doesn’t have any business logic. It uses 
 the password forget and password change forms in a central place.*/

 /**enhances the AccountPage component with the higher-order component 
 and define the authUser authorization condition */
 

import React, { Component } from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import PasswordChangeForm from '../PasswordChange';
import { PasswordForgetForm } from '../PasswordForget';
import { Panel, FormLabel} from 'react-bootstrap';
import './profile.css';

import logo from './note.JPG';



const Profile = () => (


<div className="containerprofile">

<h1>My Profile</h1>

<div class="card">
  
  <div className="logo">
          <img src={logo}  />
        </div>

  <h1><AuthUserContext.Consumer>
            {authUser => (
            <div>
                <h1>{authUser.firstname} {authUser.lasttname}</h1>
            </div>
            )}
        </AuthUserContext.Consumer></h1>
  <p class="title"><AuthUserContext.Consumer>
            {authUser => (
            <div>
                {authUser.email}
            </div>
            )}
            </AuthUserContext.Consumer></p>
  
  <p><AuthUserContext.Consumer>
            {authUser => (
            <div>
                {authUser.bio}
            </div>
            )}
        </AuthUserContext.Consumer></p>
 
  

  </div>

    <AuthUserContext.Consumer>
            {authUser => (
            <div>
                <h2>Username: {authUser.username}</h2>
              <PasswordForgetForm />
              <PasswordChangeForm />
            </div>
            )}
        </AuthUserContext.Consumer>

  </div>
);  

/**You can try it by signing out from your application and trying to access the 
/account or /home routes. Both should redirect you to the /signin route. It should 
also redirect you automatically when you stay on one of the routes while you sign out*/

const condition = authUser => !!authUser;


export default withAuthorization(condition)(Profile);




