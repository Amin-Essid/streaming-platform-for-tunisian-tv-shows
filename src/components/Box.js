import React from 'react'
import styled from 'styled-components';

const StyledBox = styled.div`
background-image: url(${props => props.img});
background-size: 100% 100%;
max-width: 100%;
height: 220px;
border-radius: 5px;
`

export default function Box({img}) {
    return (
        <StyledBox img={img}>
            
        </StyledBox>
    )
}
