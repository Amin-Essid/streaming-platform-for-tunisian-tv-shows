import React from 'react';
import NormalButton from './NormalButton';
import styled from 'styled-components';

let StyledButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: ${props => props.buttonsMargin[0]};
    margin-bottom: ${props => props.buttonsMargin[1]};
`

export default function ButtonsContainer({buttonsContent, buttonsWidth, buttonsHeight, buttonsStyle, buttonsMargin}) {
    let buttons = buttonsContent.map((button, index)=> {
        return <NormalButton key={index} buttonContent={button} buttonsWidth={buttonsWidth[index]} buttonsHeight={buttonsHeight[index]} buttonsStyle={buttonsStyle[index]} />
    })
    return (
        <StyledButtonsContainer buttonsMargin={buttonsMargin}>
        {buttons}
        </StyledButtonsContainer>
    )
}
