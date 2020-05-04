import React from 'react';
import styled from 'styled-components';



const StyledArrow = styled.div`
width: ${props => props.size === 'big' ? '50px' : '25px'};
height: ${props => props.size === 'big' ? '50px' : '25px'};
background-image: url(${props => props.imgURL});
background-size: cover;
`

export default function Arrow({arrowSize, imgURL}) {
    return (
        <StyledArrow size={arrowSize} imgURL={imgURL}/>
    )
}
