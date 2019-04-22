/**the home page is a protected route, which users 
can only access if they have been authenticated.*/
import React, { Component } from 'react';
//import React from 'react';
import { compose } from 'recompose';
import { AuthUserContext, withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';

/**enhances the HomePage component with the higher-order component 
and define the authorization condition for it:*/
const HomePage = () => (
  <div>
      <h1><AuthUserContext.Consumer>
            {authUser => (
            <div>
                <h1>{authUser.firstname} {authUser.lasttname}'s Favourites</h1>
            </div>
            )}
        </AuthUserContext.Consumer></h1>

   	 <Messages />
  </div>
);


class MessagesBase extends Component {
   constructor(props) {
    super(props);

    this.state = {
      loading: false,
      messages: [],
    };
  }

  componentDidMount() {
    this.setState({ 
      loading: true 
    });

    this.props.firebase.messages().on('value', snapshot => {
      const messageObject = snapshot.val();

      if (messageObject) {
          const messageList = Object.keys(messageObject).map(key => ({
          ...messageObject[key],
          uid: key,
        }));

        
        this.setState({ 
        	 messages: messageList,
        	 loading: false, 
        	});
      } else {
        this.setState({ messages: null, loading: false });
      }
    });
  }

  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  onRemoveMessage = uid => {
    this.props.firebase.message(uid).remove();
  };
 

  render() {
    const { messages, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {loading && <div>Loading Favourites...</div>}
      
              {messages ? (
                <MessageList 
                  authUser={authUser}
                  messages={messages}
                  onRemoveMessage={this.onRemoveMessage}
                />
         ) : (
          
            <div>There are no Favourites Saved ...</div>
        )}

         </div>
      )}
    </AuthUserContext.Consumer>
    );
  }
}
const MessageList = ({  
  authUser,
  messages, 
  onRemoveMessage 
}) => (
  <ul>
    {messages.map(message => (
      <MessageItem 
        authUser={authUser}
        key={message.uid} 
        message={message} 
        onRemoveMessage={onRemoveMessage}
      />
    ))}
  </ul>
);

const MessageItem = ({
  authUser, 
  message, 
  onRemoveMessage 
}) => (
  <li>

    {authUser.uid === message.userId && (
      <span>
            <iframe id="video" src={message.text} 
            allowFullScreen title='Placeholder'>
              </iframe>;
       
          <button type="button"onClick={() => 
            onRemoveMessage(message.uid)}>Delete
              </button>
        </span>
        )}

  </li>

);
const Messages = withFirebase(MessagesBase);
const condition = authUser => !!authUser;

export default compose(withAuthorization(condition),)(HomePage);