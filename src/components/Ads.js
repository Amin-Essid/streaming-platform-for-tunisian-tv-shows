import React from 'react';
import styled from 'styled-components';
import AdsBanner from '../images/icons/adsOne.png';

const StyledBanner = styled.div`
    width: 85%;
    max-width: 900px;
    background-image: url(${props => props.img});
    background-size: 100% 100%;
    height: 50px;
    /* border-radius: 30px; */
    margin: 1.5em auto 1.5em auto; 
    box-shadow: 0 1px 6px grey;
    @media (min-width:690px) {
        height:100px
    }
`
function Ads(){
    console.log()
    return (
        <StyledBanner img = {AdsBanner}>
            {/* <img src={AdsBanner} alt="srthdt"/> */}
        </StyledBanner>
    )
}

export default Ads