import React from 'react';
import {Link} from 'react-router-dom';


function Episode({seasonIndex, episodeIndex, episodeTitle, image, lnk, getCurrentVideoInfo}) {
    return (
        <div className='episode-style'>
            <img src={image} alt="" className="episode-style_image"/>
            <div className="episode-style_info">
                <div className="episode-style_names">
                    {/* <div className="episode-style_seasonName">
                        {`الموسم ${seasonNumber}`}
                    </div> */}
                    {/* <div className="episode-style_episodeName"> */}
                    {`${episodeTitle}`}
                    {/* </div> */}
                </div>
                <Link className="episode-style_button" to={lnk}>
                    <button onClick={() => getCurrentVideoInfo(seasonIndex, episodeIndex)}>مشاهدة</button>
                </Link>
            </div>
            
        </div>
    )
}

export default React.memo(Episode)