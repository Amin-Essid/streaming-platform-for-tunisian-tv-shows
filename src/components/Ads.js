import React from 'react';
import styled from 'styled-components';
// import AdsBanner from '../images/icons/adsOne.png';

const StyledBanner = styled.div`
    width: 85%;
    max-width: 900px;
    /* background-image: url(${props => props.img}); */
    /* background-size: 100% 100%; */
    height: 65px;
    /* border-radius: 30px; */
    margin: 1em auto .5em auto; 
    box-shadow: 0 1px 6px grey;
    @media (min-width:690px) {
        height:100px;
        margin: 1.5em auto 1.5em auto; 
    }
`
// function Ads(){
//     console.log()
//     return (
//         <StyledBanner img = {AdsBanner}>
//             {/* <img src={AdsBanner} alt="srthdt"/> */}
//         </StyledBanner>
//     )
// }

// export default Ads

export default class Ads extends React.Component {
    
  componentDidMount () {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

render () {
    return (
        <StyledBanner>
            <ins className="adsbygoogle"
                style={{ display: 'block'}}
                data-ad-client="ca-pub-8119914449289013"
                data-ad-slot="2463850031"
                data-ad-format="auto"
                data-full-width-responsive="true">
            </ins>
        </StyledBanner>
    );
  }
}