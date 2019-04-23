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
import logo from './micro.jpg';



const Profile = () => (


<div className="containerprofile">


<div className="logo">
    <img src={logo} style={{ flex: 1, justifyContent: 'center', width: 700, height: 500 }} />
</div>




<div class="grid-container">
  <div class="item1"><AuthUserContext.Consumer>
            {authUser => (
            
                <h1>Hi {authUser.firstname} {authUser.lasttname}, this is your Profile Page</h1>
            
            )}
        </AuthUserContext.Consumer></div>
  
  

  <div class="item2">
  
    <div class="card">

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
            </AuthUserContext.Consumer></p>
  
      <p><AuthUserContext.Consumer>
            {authUser => (
            <div>
                Something about me: {authUser.bio}
            </div>
            )}
        </AuthUserContext.Consumer></p>


    </div>

  </div>
 

  <div class="item3">Social Media

<div class="border-spacing">
        
          <div class="w3-card w3-round w3-white">
            <div class="xcontainer">
              
              <p contenteditable="true" class="w3-border w3-padding">Status: Feeling Blue</p></div>
              <button type="button" class="buttonpost"><i class="fa fa-pencil"></i>  Post</button> 
            
          </div>
        
      </div>
  
  </div>  


  <div class="item4">Right</div>
  <div class="item5">Social Media


  

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

/**You can try it by signing out from your application and trying to access the 
/account or /home routes. Both should redirect you to the /signin route. It should 
also redirect you automatically when you stay on one of the routes while you sign out*/

const condition = authUser => !!authUser;


export default withAuthorization(condition)(Profile);




