import React, { Component } from 'react';
import SearchBar from '../SearchBar';
import VideoList from '../VideoList';
import VideoDetail from '../VideoDetail';
import YTSearch from 'youtube-api-search';
import './Landing.css';
import { Icon, notification } from 'antd';
import dotenv from 'dotenv';//API Key Validation
dotenv.config();

const API_KEY = process.env.REACT_APP_API_KEY_YouTube;

class Landing extends Component {
  constructor( props ) {
    super(props);
    this.state = {
       videos: [],
       search: true,
       selectedVideo: {}
    };

    this.welcome();
  }

  welcome = () => {//used for a welcome notification to the user using notification component of antd

      notification.open({
          message: 'Hey nice to see you here',
          description: 'Let us start by searching for some podcasts',
          icon: <Icon type="smile" style={{ color: '#108ee9' }} />
      })
  };
/**Now here comes the use of ‘youtube-api-search’ package. This package returns a function
 which we can use to make a request to the youtube API. This function accepts an object as 
 the first argument having a key named key, there you need to provide your API key as a value. 
 And, another key named term, which takes up the search term as value.The second argument is a callback. 
 As soon as the request is completed this API returns the data as an array of 5 objects having the 
 details of the video fetched. And in case of daily limit exceeded it returns a different kind of object 
 which I have handled in try/catch block. */
  videoSearch( term ) {
        if( this.state.search ) {
             YTSearch({ key: API_KEY, term }, (data) => {
                 try {
                     if( data && data.data && data.data.error.message ) {
                         console.log(data);
                         throw ('error')
                     }
                     this.setState({ videos: data, selectedVideo: data[0] });
                     console.log( this.state.videos );
                 } catch( err ){
                     notification['error']({
                         message: "Daily Limit Exceeded",
                         description: "Youtube data API daily limit have exceeded. Quota will be recharged at 1:30pm IST. Wait till then.",
                     })
                 }

             });
         }

  }
/**. As soon as we start typing something in SearchBar the handleChange() method triggers. 
That’s what a controlled component is. And from inside of that handleChange() method we 
are calling the videoSearch() method.*/

  handleChange = (value) => {
    setTimeout( () => {
      if( value === ''){
    /**Here I am maintaining two state variables one being videos containing the array of 5 videos, 
    which will be displayed in VideoList component and another one being selectedVideo which will be played.*/
        this.setState({ videos: [], selectedVideo: null });
        return;
      }

      if( this.state.search ) {
        this.videoSearch( value );//uses of ‘youtube-api-search’ package
      }
/**setTimeouts to control the number of requests made to our API*/
      setTimeout( () => {
        this.setState({ search: true });
      }, 5000);

    }, 2000);

  };

  render() {
    return (
      <div style={{ "display": "flex", "flexDirection": "column"  }}>
        <div style={{ "display": "flex", "justifyContent": "space-between", "background": "#123456"}}>
            <h1 style={{ "color": "#fff", "alignSelf": "center", "flexBasis": "4", "paddingTop": "20px", "paddingLeft": "30px" }}>YTSearch <Icon type={"search"}/></h1>
            <SearchBar videos={ this.state.videos } video={ this.state.selectedVideo } onChange={ this.handleChange } handleSearch={ (video) => { this.setState({ selectedVideo: this.state.videos[video], search: false })}}/>
        </div>
        <div style={{ "display" : "flex" }}>
          <VideoDetail video={ this.state.selectedVideo }/>
          <VideoList
              videos={ this.state.videos }
              onVideoSelect={ ( userSelected ) => { this.setState({ selectedVideo: this.state.videos[ userSelected ] }) }}
          />
        </div>
      </div>
    );
  }
}

export default Landing;/**import React from 'react';

const Landing = () => (
  <div>
    <h1>Landing</h1>
   </div>
);

export default Landing;*/

//import React, { Component } from 'react';
//
//const API = 'https://itunes.apple.com/search?term=fun';
//const DEFAULT_QUERY = 'redux';
//
//class Landing extends Component {
//    /**First create a constructor function to pass in the props*/
//    constructor(props){
//        super(props);
//        /**start by defining states(two states used)
//        items is an array of the data we will fetch from the API*/
//       this.state = {
//            items:[],
//            isLoading: false,
//        };
//    }
//    /** within componentDidMount we will create the actual API call using the fetch()
//    componentDidMount method runs off the render() below. Render() is responsibile for producing the output*/
//   componentDidMount(){
//
//        this.setState({ isLoading: true });
//        fetch(API,{mode: 'no-cors'})//takes first argument of the url of the APi
//              .then(response => {
//                   if (response.ok) {
//                      return response.json();
//                        } else {
//                          throw new Error('Something went wrong ...');
//                        }
//      })
//            .then(data => this.setState({ items: data.results, isLoading: false }))//then get the results then convert it to json format
//     /**then we want to take the json that we have formatted. use arrow function to not loose this to set 
//     the state above in the constructor(this)*/
//            .catch(error => this.setState({ error, isLoading: false })); //stores data

//    }       
//     /** we have now got the data and saved it in the Component so we can reuse it*/  
//  render() {
//    const { items, isLoading, error } = this.state;
//
//        if (error) {
//              return <p>{error.message}</p>;
//        }

//        if (isLoading) {
//              return <p>Loading ...</p>;
//        }

//        return (
//          <ul>
//            {items.map(item =>
//                  <li key={item.artistId}>
//                  Name: {item.results.artistName} | Url: {item.results.artistViewUrl}
//                   </li>
//            )}
//          </ul>
//        );
//      }
//}
//export default Landing;








//import React, { Component } from 'react';
//
//class Landing extends Component {

//    /**First create a constructor function to pass in the props*/
//    constructor(props){
//        super(props);
//        /**start by defining states(two states used)
//        items is an array of the data we will fetch from the API*/
//        this.state = {
//            items: [],
//            isLoaded: false,//yo know when items have been loaded from API
//        }
//    }
//    /** within componentDidMount we will create the actual API call using the fetch()
//   componentDidMount method runs off the render() below. Render() is responsibile for producing the output*/
//    componentDidMount(){
//        fetch('http://jsonplaceholder.typicode.com/users')//takes first argument of the url of the APi
//            .then(res => res.json())//then get the results then convert it to json format
//     /**then we want to take the json that we have formatted. use arrow function to not loose this to set 
//     the state above in the constructor(this)*/
//            .then(json =>{
//                this.setState({/**now going to set the state*/
//                     isLoaded:true,//as we just got the data from the API
//                     items:json,//also going to set the items state to json (data we got from the API)  
//                })
//
//            });
//    }       
//     /** we have now got the data and saved it in the Component so we can reuse it*/  
//
//  render() {
//      /**variable that will access the properties inside the state. now we can access isLoaded &items*/
//      var{ isLoaded, items } = this.state;

//      if(!isLoaded){//return a div to tell user it is loading
//          return <div>Loading...</div>;
//      }
//     /**if it is loaded*/
//      else{
    
//    /** here we want to loop through all data and output to screen..using the javascript map function
//    collect items (items.map)and pass in the items that belong to the state
//    The map function creates a new array with the results of calling a function. it allows us to loop 
//    through all results
//    key attribuate is used by react to know which items have been modified
//    We want to say output a name & email this is specified in json file accessing it with dot operator*/
//    return (
//      <div className="Landing">

//              <ul>
//                  {items.map(item =>(
//                      <li key ={item.id}>    
//                          Name: {item.name} | Email: {item.email}                       
//                      </li> 
//                  ))};
//              </ul>
       
//      </div>
//    );
//    }    
//  }
//}
//
//export default Landing;

