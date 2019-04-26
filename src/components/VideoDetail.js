import { FaHeart } from 'react-icons/fa';
import 'semantic-ui-css/semantic.min.css';
import React, { Component } from 'react';
import logo from './Landing/micro.jpg';

const VideoDetail= ({video}) => {


function saveValue() {
  const textInput=videoSrc;
}

    if (!video) {
        return <div className='ui embed'>
<img src={logo} alt="Logo" style={{ flex: 1, justifyContent: 'center', width: 710, height: 400 }}></img></div>;      
    }

    const testVariable="";
    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
    console.log(typeof(video));

    return (
        <div>
            <div className='ui embed'>
                <iframe src={videoSrc} allowFullScreen title='Video player'/>
            </div>
            <div className='ui segment'>
                <h4 className='ui header'>{video.snippet.title}</h4>
                <p>{video.snippet.description}</p>
                <p>Copy this Link to Add to Favourites:  <strong>{videoSrc}</strong></p>
            </div>
            <input type="button" style={{float:'right'}} value={videoSrc} onClick={saveValue}/>
        </div>
       
    )

}

export default VideoDetail;
