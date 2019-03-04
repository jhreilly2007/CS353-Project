/** the authenticated user still needs to be passed down 
from the App component to interested parties...using context.js 
the React Context API passes down the Firebase instance to 
authenticated user.  */
import React from 'react';

const AuthUserContext = React.createContext(null);

export default AuthUserContext;