/** protected account page!!
 The Account page serves as the central place for users to 
 manage their account, where it shows the PasswordChangeForm 
 and PasswordResetForm, accessible by a standalone route.

 The Account page doesn’t have any business logic. It uses 
 the password forget and password change forms in a central place.*/

 /**enhances the AccountPage component with the higher-order component 
 and define the authUser authorization condition */
 

import React from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
//import PasswordChangeForm from '../PasswordChange';
//import { PasswordForgetForm } from '../PasswordForget';
//import { Panel, FormLabel} from 'react-bootstrap';
import './profile.css';
import logo from './musicalnote.png';



//const ProfileTemplate

const Profile = () => (


<div className="containerprofile">



<div class="grid-container">
  <div class="item1"><AuthUserContext.Consumer>
            {authUser => (
            
                <h1>Hi {authUser.firstname} {authUser.lasttname}, this is your Profile Page</h1>
            
            )}
        </AuthUserContext.Consumer></div>
  
  

    <div class="item2">
        <div class="card">

            <div className="logo">
              <img src={logo} />
            </div>

            <AuthUserContext.Consumer>
                {authUser => (
                <h1>{authUser.firstname} {authUser.lastname}</h1>
                   )}
            </AuthUserContext.Consumer>

            <p class="title"><AuthUserContext.Consumer>
                {authUser => (
            
                  <div>
                      Username: {authUser.username}
                      <br></br>
                      Email: {authUser.email}
                  </div>
                     )}
              </AuthUserContext.Consumer>
            </p>
  
            <p><AuthUserContext.Consumer>
                {authUser => (
                  <div>
                    Something about me: {authUser.bio}
                  </div>
                    )}
                  </AuthUserContext.Consumer>
            </p>

            <div class="border-spacing">
                <div class="w3-card w3-round w3-white">
                 <div class="xcontainer">
                    <p contenteditable="true" class="w3-border w3-padding">Status: Feeling Blue</p>
                  </div>
                </div>
            </div>

       </div>
    </div>
 

  <div class="item3">Social Media

     
  </div>  


  <div class="item4">Friends</div>
  <div class="item5">Messages


  

{/*
<AuthUserContext.Consumer>
            {authUser => (
            <div>
                <h3>Username: {authUser.username}</h3>
              <PasswordForgetForm />
              <br/>
              <PasswordChangeForm />
            </div>
            )}
        </AuthUserContext.Consumer>*/}

  </div>



  </div>
</div>



 

    
);  


/**<form method="post" accept-charset="UTF-8">
    
    <input type="hidden" name="action" value="users/saveUser">
    <input type="hidden" name="redirect" value="users/{{ currentUser.username }}">
    <input type="hidden" name="userId" value="{{ currentUser.id }}">

    <label for="location">Location</label>
    <input type="text" id="location" name="fields[location]" value="{{ currentUser.location }}">

    <label for="bio">Bio</label>
    <textarea id="bio" name="fields[bio]">{{ currentUser.bio }}</textarea>

    <input type="submit" value="Save Profile">
</form>

*/

/**You can try it by signing out from your application and trying to access the 
/account or /home routes. Both should redirect you to the /signin route. It should 
also redirect you automatically when you stay on one of the routes while you sign out*/

const condition = authUser => !!authUser;


export default withAuthorization(condition)(Profile);




