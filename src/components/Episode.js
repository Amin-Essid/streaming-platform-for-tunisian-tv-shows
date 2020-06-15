import React from 'react';
import {Link} from 'react-router-dom';


function Episode({seasonIndex, episodeIndex, episodeTitle, image, lnk, getCurrentVideoInfo}) {
    return (
        <Link className='episode-style' to={lnk} onClick={() => getCurrentVideoInfo(seasonIndex, episodeIndex)}>
        {/* <Link className="episode-style_button" to={lnk}> */}
        <div>
            <img src={image} alt="" className="episode-style_image"/>
            <div className="episode-style_info">
                <div className="episode-style_names">
                    {`${episodeTitle}`}
                </div>
                    {/* <button onClick={() => getCurrentVideoInfo(seasonIndex, episodeIndex)}>مشاهدة</button> */}
            </div>
        </div>
            
        </Link>
    )
}

export default React.memo(Episode)