import React from 'react';
import 'semantic-ui-css/semantic.min.css';


class SearchBar extends React.Component{
/**create a state object and two callback(handleChange and handleSubmit)
  term=input to search what we are looking for */

    state = {
        term:'Enter Search'
    };

    /**this.set state change set state*/    
    handleChange = (event) =>{
        this.setState({
            term: event.target.value
        });
    };

/**we take the term from serachbar compoent and assign to q to that 
we need to pass handleSubmit as a prop to SearchBar Component
(ie handleFormSubmit = this.handleSubmit)
event.preventDefault() prevents default actin on submit*/

    handleSubmit =  event =>{
        event.preventDefault();
        this.props.handleFormSubmit(this.state.term);
    }

        /**On submit event handler to show result of search
            onchange event handler in order to mutate keyword*/
    render() {
        return (
            <div className='search-bar ui segment'>
                <form onSubmit={this.handleSubmit} className='ui form'>
                    <div className='field'>
                        <label htmlFor="video-search">Video Search &#128269;</label>
                        <input onChange={this.handleChange} name='video-search' type="text" value={this.state.term}/>
                    </div>
                </form>
            </div>
        )
    }
}
export default SearchBar;

