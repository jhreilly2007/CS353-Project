import React from 'react';
import 'semantic-ui-css/semantic.min.css';

const VideoDetail = ({video}) => {
    if (!video) {
        return <div className='ui embed'>
        <a id="play-video" href="#"></a><br />
        <iframe id="video" src="//www.youtube.com/embed/7lCDEYXw3mM?rel=0" 
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
                <p>{video.snippet.description}</p>
            </div>
        </div>

    )
}

export default VideoDetail;