import React from 'react';
import Loading from './Loading'

const Video = ({videoId}) => {
    if(!videoId) return <Loading />
    const videoSrc = `https://www.youtube.com/embed/${videoId}`
    return (
        <div className='videoPlayer'>
            <iframe width='100%' height='100%' src={videoSrc} frameBorder="0" title="video player"></iframe>
        </div>
    )
}

export default React.memo(Video)
