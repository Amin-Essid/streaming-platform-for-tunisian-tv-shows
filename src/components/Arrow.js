import React from 'react';
import styled from 'styled-components';



const StyledArrow = styled.div`
width: ${props => props.size};
height: ${props => props.size};
background-image: url(${props => props.imgURL});
background-size: 100% 100%;
`

export default function Arrow({arrowSize, imgURL}) {
    return (
            <StyledArrow size={arrowSize} imgURL={imgURL}/>
    )
}
