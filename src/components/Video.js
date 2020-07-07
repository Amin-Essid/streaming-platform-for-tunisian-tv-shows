import React from 'react';
import Loading from './Loading'

const Video = ({videoId, epTitle}) => {
    if(!videoId || epTitle === 'wait') return <Loading />
    const videoSrc = `https://www.youtube.com/embed/${videoId}`
    return (
        <>
            <div className='videoPlayer'>
                <iframe 
                width='100%' 
                height='100%' 
                src={videoSrc} 
                frameBorder="0" 
                title="video player"
                allowFullScreen></iframe>
            </div>
            <div className='episode-title'>
                <p>{epTitle}</p>
            </div>
        </>
    )
}

export default React.memo(Video)
