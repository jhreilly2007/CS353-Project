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
  	
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.SIGN_IN);
          }
        },
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