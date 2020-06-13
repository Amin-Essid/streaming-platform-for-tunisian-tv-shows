import React from 'react'
import styled from 'styled-components';
import { Link } from "react-router-dom";


const StyledBox = styled.div`
display: flex;
background-image: url(${props => props.img});
background-size: 100% 100%;
width: ${props => props.boxWidth};
height: ${props => props.boxHeight};
flex-shrink: 0;
border-radius: 5px;
background-color: #5A668C ;
border: ${props => props.boxWidth === '100px' ? 'none' : '3px solid #5A668C'};
&:hover {
    transform: scale(1.03);
    filter: brightness(1.2);
}
cursor: pointer;
box-shadow: 0 3px 6px grey;
margin-top: 4px;
margin-bottom: 4px;
`



function Box({img, boxWidth, boxHeight, lnk, name, boxContentStyle = 'DefaultBoxContentStyle', boxLinkStyle}) {
    return (
        <Link className= {boxLinkStyle} to={lnk}>
            <StyledBox id='styledBox' boxWidth={boxWidth} boxHeight={boxHeight} img={img}>
                {
                    name ? (<div className={boxContentStyle}>
                        <p>{name}</p>
                        </div>) : ''
                }
            </StyledBox>
        </Link>
    )
}


export default React.memo(Box)
