import React from 'react'
import {Link} from 'react-router-dom';

export default function NextEpisode({video, getCurrentVideoInfo, seasonIndex, episodeIndex, lnk}) {
    console.log(video)
    console.log(lnk)
    return (
        <>
            <Link to={lnk}>
                <div onClick={() => getCurrentVideoInfo(seasonIndex, episodeIndex)}>
                    {video.snippet.title}
                
                </div>
            </Link>
        </>
    )
}
