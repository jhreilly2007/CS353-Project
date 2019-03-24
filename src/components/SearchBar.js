import React, { Component } from 'react';
import  { AutoComplete, Button, Icon } from 'antd';
const Option = AutoComplete.Option;//AutoComplete component from antd
class SearchBar extends Component {

    state = {
      videos: []
    };

    /**filling this autocomplete component with 5 videos which are coming from 
    API on the basis of the search term*/

    componentDidUpdate( prevProps ) {
      if( this.props.video && prevProps.video !== this.props.video ) {
          this.setState({ videos: this.props.videos })
      }
    }

    onSelect = (value, index ) => {
        let val = parseInt(index.key, 10);
        this.props.handleSearch( val );
    };
  /** we are ready with a search bar with autocompletion feature*/
    render() {
        return(
            <div style={{ "textAlign": "center", "background": "#123456", "padding": "35px" }}>
                   <AutoComplete
                    size={"large"}
                    style={{ width: 400 }}
                    onSelect={ this.onSelect }
                    onChange={ this.props.onChange }
                    placeholder="Search Podcasts"
                >
                    { this.state.videos.map((video, index)  => <Option key={ index } >{ video.snippet.title }</Option> ) }
                </AutoComplete>
                <Button style={{ "marginLeft":"5px" }} size={"large"}><Icon type={"search"}/></Button>
            </div>
        );
    }
}



export default SearchBar;