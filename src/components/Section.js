import React from 'react';
import Container from './Container';
import Arrow from './Arrow';
import rightArrow from '../images/icons/rightArrow.png';
import leftArrow from '../images/icons/leftArrow.png';
import styled from 'styled-components';


export default function Section({loading, sectionShows, arrowSize, containerSize, boxSize }){
    return (
        <section>
            <Arrow arrowSize="big" imgURL={rightArrow}/>
            <Container loading={loading} containerShows={sectionShows} containerSize='' boxSize='' />
            <Arrow arrowSize={arrowSize} imgURL={leftArrow}/>
         </section>
    )
}
