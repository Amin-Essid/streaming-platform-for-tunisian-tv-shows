import React from 'react';
import {Link} from 'react-router-dom';

export default function PreviousSeason({season, lnk, getCurrentVideoInfo, seasonIndex, episodeIndex}) {
    return (
        <>
            <Link to={lnk}>
                <div onClick={() => getCurrentVideoInfo(seasonIndex, episodeIndex)}>
                    {season}
                </div>
            </Link>
        </>
    )
}
