import React from 'react';
import {Link} from 'react-router-dom';
import whiteLeftArrow from '../images/icons/whiteLeftArrow.png';

function NextEpisode({videoTitle, getCurrentVideoInfo, seasonIndex, episodeIndex, lnk}) {

    if(videoTitle === 'nowhere' || lnk === null){
        return null
    } else {
        return (
            <>
                <Link to={lnk} className='nextEpisode'>
                    <div className='streamButton' onClick={() => getCurrentVideoInfo(seasonIndex, episodeIndex)}>
                        <p>التالية</p>
                        <img src={whiteLeftArrow} alt="whiteRightArrow"/>
                    </div>
                </Link>
            </>
        )
    }
}

export default React.memo(NextEpisode)