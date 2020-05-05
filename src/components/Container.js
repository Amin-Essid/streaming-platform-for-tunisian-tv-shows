import React from 'react';
import Box from './Box';
import Loading from './Loading';
import styled from 'styled-components';

const StyledContainer = styled.div`
    width:100%;
    margin: 0 0.8em;
`

export default function Container({loading, containerShows, boxWidth, boxHeight}) {
        return (
            <StyledContainer>
            {loading ? <Loading /> : <Box boxWidth={boxWidth} boxHeight={boxHeight} img = {containerShows[0].img[0]}/>}
            </StyledContainer>
        )
}
