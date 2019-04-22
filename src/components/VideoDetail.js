import { FaHeart } from 'react-icons/fa';
import 'semantic-ui-css/semantic.min.css';
import React, { Component } from 'react';

const VideoDetail= ({video}) => {

    if (!video) {
        return <div className='ui embed'>
        <a id="play-video" href="#"></a><br />
        <iframe id="video" src="https://www.youtube.com/embed/dcqrNXKv628" 
        allowFullScreen title='Placeholder'></iframe></div>;      
    }

    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
    console.log(typeof(video));
    return (
        <div>
            <div className='ui embed'>
                <iframe src={videoSrc} allowFullScreen title='Video player'/>
            </div>
            <div className='ui segment'>
                <h4 className='ui header'>{video.snippet.title}</h4>
                <FaHeart value={videoSrc} style={{float:'right'}}/>
                <p>{video.snippet.description}</p>
                <p>Copy this Link to Add to Favourites:  <strong>{videoSrc}</strong></p>

                </div>
            </div>

    )

}

export default VideoDetail;