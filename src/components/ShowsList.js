import React from 'react';
import Box from './Box.js';
import styled from 'styled-components';

let StyledShowsList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 90%;
    margin: 0 auto;
`

export default function ShowsList({shows}) {
    shows = shows.map(show => {
        return (
            <Box 
                style = {{ marginBottom: "1em"}}
                key={show.id} 
                name={show.name} 
                img = {show.img[0]}
                lnk={`/${show.type}/${show.name}`}
                boxWidth='200px' 
                boxHeight='250px' 
                boxLinkStyle = 'boxInShowsList'
                boxContentStyle='boxContentStyle'
            />)
    })

    return (
        <>
            { shows.length === 0 ? (<h1 className='no-items-style'>لا توجد مسلسلات بهذه المواصفات</h1>) : (
                <StyledShowsList>
                    {shows}
                </StyledShowsList>
            ) }
        </>
    )
}
