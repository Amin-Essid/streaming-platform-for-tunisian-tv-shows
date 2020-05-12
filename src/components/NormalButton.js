import React from 'react';
import styled from 'styled-components';

let StyledNormalButton = styled.div`
    & + & {
        margin-right: 1em;
    }
    /* padding: auto auto; */
    width: ${props => props.buttonWidth};
    height: ${props => props.buttonHeight};
    border-radius: 5px;
    box-shadow: 0 3px 6px grey;
    cursor: pointer;
    font-weight: medium;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
    transform: scale(1.03);
    filter: brightness(1.2);
}
`



export default function NormalButton({buttonContent, buttonsWidth, buttonsHeight, buttonsStyle}) {
    return (
        <StyledNormalButton buttonWidth={buttonsWidth} buttonHeight={buttonsHeight} className={buttonsStyle}>{buttonContent}</StyledNormalButton>
    )
}
