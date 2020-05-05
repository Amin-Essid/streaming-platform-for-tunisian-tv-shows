import React from 'react';
import Container from './Container';
import Arrow from './Arrow';
import rightArrow from '../images/icons/rightArrow.png';
import leftArrow from '../images/icons/leftArrow.png';
import styled from 'styled-components';


const StyledSection = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
min-width: 300px;
max-width: 95%;
margin: 1em auto;
`



export default function Section({loading, sectionShows, arrowSize, boxWidth, boxHeight }){
    return (
        <StyledSection>
            <Arrow arrowSize={arrowSize} imgURL={rightArrow}/>
            <Container loading={loading} containerShows={sectionShows} boxWidth={boxWidth} boxWidth={boxHeight}  />
            <Arrow arrowSize={arrowSize} imgURL={leftArrow}/>
         </StyledSection>
    )
}
