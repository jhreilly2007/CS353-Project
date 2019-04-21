/**Consists of the page, a form, and a link. The form 
is used to sign up a new user to your application with 
username, email, and password. The link will be used on 
the sign in page (login page) later if a user has no account 
yet. It is a redirect to the sign up page, but not used on the 
sign up page itself.*/

/**initialize the state of the component. It will capture 
the user information such as username, email, and password. There 
is a second password field/state for a password confirmation. 
In addition, there is an error state to capture an error object 
in case of the sign up request to the Firebase API fails. 
The state is initialized by an object destructuring. This way, 
we can use the initial state object to reset the state after a 
successful sign up.*/


import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import './SignUp.css';
import * as ROLES from '../../constants/roles';

const SignUpPage = () => (
  
  <div>
     <SignUpForm />
  </div>
  
);

const INITIAL_STATE = {
  firstname:'',
  lastname: '',
  bio: '',
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,//check if administrator
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { firstname, lastname, bio, username, email, passwordOne, isAdmin } = this.state;
    const roles = {};

        if (isAdmin) {
        roles[ROLES.ADMIN] = ROLES.ADMIN;
        }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        //Add another API request to create a user when the sign up is successful.
        //(1) It creates a user in Firebase’s internal authentication database that is only limited accessible.
        //(2) If (1) was successful, it creates a user in Firebase’s realtime database that is accessible.
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            firstname,
            lastname,
            bio,
            username,
            email,
            roles,
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();

  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      firstname,
      lastname,
      bio,
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
    } = this.state;


    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    



    return (


      <form className="form-signup" onSubmit={this.onSubmit}>


      <input className="form-control" 
          name="firstname"
          value={firstname}
          onChange={this.onChange}
          type="text"
          placeholder="Fist Name"
        />
        <input className="form-control" 
          name="lastname"
          value={lastname}
          onChange={this.onChange}
          type="text"
          placeholder=" Last Name"
        />
        <input className="form-control" 
          name="bio"
          value={bio}
          onChange={this.onChange}
          type="text"
          placeholder="Biography: A brief description"
        />
        <input className="form-control" 
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Surname"
        />
        <input className="form-control" 
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input className="form-control" 
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input className="form-control" 
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <label>
          Admin:
          <input
            name="isAdmin"
            type="checkbox"
            checked={isAdmin}
            onChange={this.onChangeCheckbox}
          />
        </label>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign Up</button>

        {error && <p>{error.message}</p>}

      </form> 
      
    );
  }
}

const SignUpLink = () => (
 
  <p>
    <br /><br /><br />
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>


);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };