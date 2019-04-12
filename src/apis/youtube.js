/**Fetching Data using axios Library

axios library will make a network request over to the youtube API. So 
we can fetch a list of videos realted to the search term easily

This part basically tells youTube what kind of data we want to receive

Snippet tells api to send back a snippet summary of the entire video..This
will give us piece of info like title, description, URL, author etc

We will import this file into Landing Component in order to use fetched video list*/

import axios from 'axios';
const KEY = 'AIzaSyAlbKwdD9J0DrKGVRjUWy8Wuv_2UAjLsM0';

export default axios.create({

    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',//Snippet tells api to send back a snippet summary of the entire video
        maxResults: 5,//indicates max number of results to return
        key: KEY
    }
})