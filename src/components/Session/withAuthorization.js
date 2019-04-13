  /**There is no reason to show a non authenticated user the account 
or home page in the first place, because these are the places where 
a user accesses sensible information.

The higher-order component, withAuthorization shields the authorization 
business logic from your components. It can be used on any component that 
needs to be protected with authorization. You can define the authorization 
condition*/
import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
  	/**The real authorization logic happens in the componentDidMount() lifecycle method
  	it uses the Firebase listener to trigger a callback function every time the authenticated 
  	user changes. The authenticated user is either a authUser object or null. Within this 
  	function, the passed condition() function is executed with the authUser*/
  	
/**Merging authenicated user with databaseuser
Since we need to check the roles only in the authorization higher-order component, it’s 
best to merge the authentication user and database user in this component before checking for 
its privileges (roles, permissions).*/


    componentDidMount() {
      /**when user changes the function within the listener is called*/
      this.listener = this.props.firebase.onAuthUserListener(
        /**if user is not null we gret user with help of the authenticated users UID then
        merge everything from the database user with the unique ID and email from auth user
        If conditions are met user can stay on component enhanced by the authorization 
        higher-order component*/
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.SIGN_IN);
          }
        },
        () => this.props.history.push(ROUTES.SIGN_IN),
      );
    }

     componentWillUnmount() {
      this.listener();
    }
/**	The render method displays the passed component (e.g. home page, account page) 
	  that should be protected by this higher-order component*/

/**  avoid showing the protected page before the redirect happens. You want to show 
    nothing if the authenticated user doesn’t meet the condition’s criteria.*/
    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization);
};

export default withAuthorization;	