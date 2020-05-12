import React from 'react'
import styled from 'styled-components';

const StyledBox = styled.div`
background-image: url(${props => props.img});
background-size: 100% 100%;
width: ${props => props.boxWidth};
height: ${props => props.boxHeight};
flex-shrink: 0;
border-radius: 5px;
& + & {
    margin-right: 1em;
}
&:hover {
    transform: scale(1.03);
    filter: brightness(1.2);
}
cursor: pointer;
box-shadow: 0 3px 6px grey;
`

export default function Box({img, boxWidth, boxHeight}) {
    return (
        <StyledBox boxWidth={boxWidth} boxHeight={boxHeight} img={img}>
            
        </StyledBox>
    )
}
