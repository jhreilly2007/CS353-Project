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
import PasswordChangeForm from '../PasswordChange';

const AccountPage = () => (
	<AuthUserContext.Consumer>
    	{authUser => (
  			<div>
        		<h1>Account: {authUser.email}</h1>
    			
    			<PasswordChangeForm />
  			</div>
     )}

  </AuthUserContext.Consumer>
);
/**You can try it by signing out from your application and trying to access the 
/account or /home routes. Both should redirect you to the /signin route. It should 
also redirect you automatically when you stay on one of the routes while you sign out*/

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);