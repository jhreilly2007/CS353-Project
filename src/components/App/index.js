/**he App component is a function component... it uses the higher-order 
component to make the authenticated user available for all other components 
below of the App component:
It implements a  Navigation component that will be used 
in the App component  it also uses the Router component provided 
by React Router. The App component will render the Navigation 
component, but replaces the other components (pages) 
based on the routes. Basically, the App component is the container 
where all your fixed components are going (e.g. navigation bar, 
side bar, footer), but also your components that are displayed 
depending on the route in the URL (e.g. account page, login page, 
password forget page). Specify which components should show up 
according to corresponding routes with the help of the Route 
component from React Router. thus, all the page components in the 
App component are exchangeable by changing the route*/

 
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <hr />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route
        path={ROUTES.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
    </div>
  </Router>
);

export default withAuthentication(App);