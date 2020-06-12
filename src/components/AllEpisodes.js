import React from 'react';
import {Link} from 'react-router-dom';

 function AllEpisodes({lnk}) {
    return (
        <>
            <Link className='AllEpisodes' to={lnk}>
                <div className='streamButton'>
                    <p>كل الحلقات</p>
                </div>
            </Link>
        </>
    )
}

export default React.memo(AllEpisodes)
