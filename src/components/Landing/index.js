    
/**This Landing Component is created as a class-based component
because it holds all of the other states*/

import React from 'react';
import SearchBar from '../SearchBar';
import youtube from '../../apis/youtube';
import VideoList from '../VideoList';
import VideoDetail from '../VideoDetail';
import 'semantic-ui-css/semantic.min.css';
import { AuthUserContext, withAuthorization } from '../Session';



class Landing extends React.Component{
  state={
    videos: [],
    selectedVideo: null,
  }
/**assigned termFromSearchbar as we pass term from Searchber(this.prop.handleFormSubmit)
  we take the term from serachbar compoent and assign to q to that we need to pass handleSubmit 
  as a prop to the SearchBar Component(ie handleFormSubmit = this.handleSubmit)*/

    handleSubmit = async (termFromSearchBar) => {
        const response = await youtube.get('/search', {
            params: {
                q: termFromSearchBar
            }
        })
        this.setState({
            videos: response.data.items
        })
    };
    handleVideoSelect = (video) => {
        this.setState({selectedVideo: video})
    }

    render() {
        return (
            <div style={{margin: '1em'}}>
                <SearchBar handleFormSubmit={this.handleSubmit}/>
                <div style={{margin: '1em'}} className='ui grid'>
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo}/>
                        </div>
                        <div className="five wide column">
                            <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const condition = authUser => !!authUser;

export default Landing;
 
















/**import React, { Component } from 'react';
const API = 'https://prod.mypod.online/feed?q=';
const API_KEY = 'queen';
class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hits: [],
      isLoading: false,
      error: null,
    };
  }
  componentDidMount() {
    fetch(API+API_KEY)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(result => this.setState({ hits: result.hits, isLoading: false }))
      .catch(error => this.setState({ error, isLoading: false }));
  }
  render() {
    const { hits, isLoading, error } = this.state;
    if (error) {
      return <p>{error.message}</p>;
    }
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <ul>
        {hits.map(hit =>
          <li key={hit.objectID}>
            <a href={hit.url}>{hit.title}</a>
          </li>
        )}
      </ul>
    );
  }
}
export default Landing;
*/

 
















