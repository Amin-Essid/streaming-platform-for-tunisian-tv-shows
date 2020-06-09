import React from 'react';
import {Link} from 'react-router-dom';
import whiteLeftArrow from '../images/icons/whiteLeftArrow.png';

export default function NextEpisode({videoTitle, getCurrentVideoInfo, seasonIndex, episodeIndex, lnk}) {

    if(videoTitle === 'nowhere' || lnk === null){
        return null
    } else {
        return (
            <>
                <Link to={lnk} className='nextEpisode'>
                    <div className='streamButton' onClick={() => getCurrentVideoInfo(seasonIndex, episodeIndex)}>
                        
                        <p>{videoTitle}</p>
                        <img src={whiteLeftArrow} alt="whiteLeftArrow"/>
                    </div>
                </Link>
            </>
        )
    }
}
