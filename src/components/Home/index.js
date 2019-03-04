/**the home page is a protected route, which users 
can only access if they have been authenticated.*/
import React from 'react';

import { withAuthorization } from '../Session';

/**enhances the HomePage component with the higher-order component 
and define the authorization condition for it:*/
const HomePage = () => (
  <div>
    <h1>Home Page</h1>
   	<p>The Home Page is accessible by every signed in user.</p>
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);