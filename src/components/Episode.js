import React from 'react';
import {Link} from 'react-router-dom';


function Episode({episodeNumber, seasonNumber, image, lnk}) {
    return (
        <div className='episode-style'>
            <img src={image} alt="" className="episode-style_image"/>
            <div className="episode-style_info">
                <div className="episode-style_names">
                    <div className="episode-style_seasonName">
                        {`الموسم ${seasonNumber}`}
                    </div>
                    <div className="episode-style_episodeName">
                    {`الحلقة ${episodeNumber}`}
                    </div>
                </div>
                <Link className="episode-style_button" to={lnk}>
                    <button>مشاهدة</button>
                </Link>
            </div>
            
        </div>
    )
}

export default React.memo(Episode)