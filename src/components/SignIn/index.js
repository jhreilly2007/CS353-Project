/**Its input fields capture all the necessary information like 
username and password. A validation step makes sure the email 
and password are set before performing the request by enabling 
or disabling the submit button. The authentication API is used 
to sign in the user. If sign in succeeds, the local state is 
updated with the initial state and the user is redirected again. 
If the sign in fails, an error object is stored in the local state 
and an error message appears. The SignUpLink, which was defined 
in the SignUp module, is used on the sign in page. It lets users 
sign up if they don’t have an account, and it is found on the sign 
in page.*/
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { PasswordForgetLink } from '../PasswordForget';
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import './Signin.css';





const SignInPage = () => (

  <div>
   
    <SignInForm />
    <SignUpLink />
    <PasswordForgetLink/>
  
  </div>


);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
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



  /** render() {*****Old code to be deleted
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (

    
  
      <form class="form-signup" onSubmit={this.onSubmit}>
      <h2 class="form-signup-heading">Please Sign In</h2>

        <input type="text" className="form-control" placeholder="Email address" required
                           autoFocus onChange={this.onChange}/>

        <input type="password" className="form-control" placeholder="Password" required
                           onChange={this.onChange}/>


        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign In</button>
    

        {error && <p>{error.message}</p>}
      </form>

     
    
    );
  }*/


  render() {
    const { email, password, error } = this.state;

    //const isInvalid = password === '' || email === '';

   
    return (
      <form class="form-signup" onSubmit={this.onSubmit}>
        <input className="form-control"
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input className="form-control"
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    ); 

  } 
}


const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm };

