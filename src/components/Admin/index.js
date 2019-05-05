/**protected admin page!!
 On the admin page, a user authorized as admin will 
 be able to manage this application’s users. The admin 
 page is protected on a more fine-grained level, because 
 it is only accessible for authenticated admin users.*/

 //perfect place to fetch users from your Firebase realtime database 


import React, { Component } from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }
/**The listener is called on()which recieves a type and a callback()
The on() registers a continuous listener that triggers everytime something has changed
the once() registers a listener that would be called only once
Since the users are objects rather than lists when they are retrieved from the Firebase database, 
you have to restructure them as lists (arrays), which makes it easier to display them later:*/
 componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }
/** off()removes listener to avoid memory leaks from using same UID*/
  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>
        <p>
          The Admin Page is accessible by every signed in admin user.
        </p>
        <p>
        At the moment the Admin Page is only used to show future potential.
        </p>
        <p>
        This is a list of all users that have signed up to our application. We could
        use this feature to edit content, block users etc..
        </p>
        <p>
        This section needs further development in later sprints
        </p>

        {loading && <div>Loading ...</div>}

        <UserList users={users} />
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <ul>
  <p> <strong>List of Registered Users</strong></p>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID: </strong> {user.uid} 
        </span>
        <span>
          <strong>  E-Mail: </strong> {user.email} 
        </span>
        <span>
          <strong>  Username: </strong> {user.username} 
        </span>
      </li>
    ))}
  </ul>
);

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(withAuthorization(condition),withFirebase,)(AdminPage);