import React from 'react'
import './FrontDoorVideo.css'

export default function FrontDoorVideo() {
    return (
        <div className='video-container'>
            {/* https://www.youtube.com/watch?v=wnHW6o8WMas */}
            {/* <video  width="420" height="315" src='https://www.youtube.com/watch?v=oyGL591b_0Q' autoPlay loop muted/> */}
            <video src='/videos/frontpage.mp4' autoPlay loop muted/>
            <h1>WELCOME, STRANGER</h1>
            <p>Get up and start pumping!</p>
        </div>
    )
}
