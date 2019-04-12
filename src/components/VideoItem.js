/**Inside VideoItem Component we should return details about the selected videos

Deconstructed props to get two objects video-description and video title and selected videos
image with writing it's url tag to the src tag*/

import React from 'react';
import '../style/video.css';
import 'semantic-ui-css/semantic.min.css';


const VideoItem = ({video , handleVideoSelect}) => {
    return (
        <div onClick={ () => handleVideoSelect(video)} className=' video-item item'>
            <img className='ui image' src={video.snippet.thumbnails.medium.url} alt={video.snippet.description}/>
            <div className='content'>
                <div className='header '>{video.snippet.title}</div>
            </div>
        </div>
    )
};
export default VideoItem;