import React, { Component } from 'react';

class api extends Component {

    /**First create a constructor function to pass in the props*/
    constructor(props){
        super(props);
        /**start by defining states(two states used)
        items is an array of the data we will fetch from the API*/
        this.state = {
            items: [],
            isLoaded: false,//yo know when items have been loaded from API
        }
    }
    /** within componentDidMount we will create the actual API call using the fetch()
    componentDidMount method runs off the render() below. Render() is responsibile for producing the output*/
    componentDidMount(){
        fetch('http://jsonplaceholder.typicode.com/users')//takes first argument of the url of the APi
            .then(res => res.json())//then get the results then convert it to json format
     /**then we want to take the json that we have formatted. use arrow function to not loose this to set 
     the state above in the constructor(this)*/
            .then(json =>{
                this.setState({/**now going to set the state*/
                     isLoaded:true,//as we just got the data from the API
                     items:json,//also going to set the items state to json (data we got from the API)  
                })

            });
    }       
     /** we have now got the data and saved it in the Component so we can reuse it*/  

  render() {
      /**variable that will access the properties inside the state. now we can access isLoaded &items*/
      var{ isLoaded, items } = this.state;

      if(!isLoaded){//return a div to tell user it is loading
          return <div>Loading...</div>;
      }
     /**if it is loaded*/
      else{
    
    /** here we want to loop through all data and output to screen..using the javascript map function
    collect items (items.map)and pass in the items that belong to the state
    The map function creates a new array with the results of calling a function. it allows us to loop 
    through all results
    key attribuate is used by react to know which items have been modified
    We want to say output a name & email this is specified in json file accessing it with dot operator*/
    return (
      <div className="api">

              <ul>
                  {items.map(item =>(
                      <li key ={item.id}>    
                          Name: {item.name} | Email: {item.email}                       
                      </li> 
                  ))};
              </ul>
       
      </div>
    );
    }    
  }
}

export default api;

