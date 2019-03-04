/**This is the overseer for the session state. Logic regarding the current authenticated 
  user needs to be stored and made accessible to other components. The App component only 
  needs to keep track of an authenticated user (session). If a user is authenticated, store 
  it in the local state and pass the authenticated user object down to all components that 
  are interested in it. Otherwise, pass the authenticated user down as null. That way, all 
  components interested in it can adjust their behavior (e.g. use conditional rendering) 
  based on the session state.

  Any component can simply use React’s Context to consume the authenticated 
  user. This is the session handling for the authenticated user. Uses the React
   Context to provide the authenticated user.*/
   
import React from 'react';
import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
  	constructor(props) {
      super(props);

      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null });
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;