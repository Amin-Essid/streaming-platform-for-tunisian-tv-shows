import React from 'react';
import styled from 'styled-components';



const StyledArrow = styled.div`
width: ${props => props.size};
height: ${props => props.size};
background-image: url(${props => props.imgURL});
background-size: 100% 100%;
cursor: pointer;
`



export default function Arrow({arrowSize, imgURL, moveBoxesFunction}) {
    return (
            <StyledArrow onClick={moveBoxesFunction} size={arrowSize} imgURL={imgURL}/>
    )
}
