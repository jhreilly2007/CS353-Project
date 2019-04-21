/**	The application needs multiple. For instance, 
	a user should be able to visit a public landing page, and 
	also use sign up and sign in pages to enter the application 
	as an authenticated user. If a user is authenticated, it is 
	possible to visit protected pages like account or admin pages 
	whereas the latter is only accessible by authenticated users 
	with an admin role. This is where all the routes in the 
	application are consolidated*/

export const LANDING = '/';
export const SIGN_UP = '/signup';
export const SIGN_IN = '/signin';
export const HOME = '/home';
export const ACCOUNT = '/account';
export const ADMIN = '/admin';
export const PASSWORD_FORGET = '/pw-forget';
export const PROFILE_PAGE = '/profile';
