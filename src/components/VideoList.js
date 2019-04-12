/** VideoList Component is a functional component. It eill get list from the Landing 
Component. VideoList Component is the parent of VideoItem Component*/

import React from 'react';
import VideoItem from './VideoItem';
import 'semantic-ui-css/semantic.min.css';

const VideoList = ({videos, handleVideoSelect}) =>{

	const renderedVideos = videos.map((video) =>{
		return <VideoItem key ={video.id.videoId} video ={video} handleVideoSelect={handleVideoSelect}/>
		//this destructures out props object that we pass from parent object, then mapping over the
		//video list which returns new array and finally we return VideoItem with some properties
	});
	return <div className ='ui relaxed dividend list'>{renderedVideos}</div>;
};

export default VideoList;