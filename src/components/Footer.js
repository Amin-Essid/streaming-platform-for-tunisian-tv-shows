import React from 'react'
import styled from 'styled-components';

const StyledFooter = styled.div`
    background-color: #F26B6B;
    height: auto;
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 60px;
    p {
        color: white;
        font-size: 1rem;
        text-align: center;
    }
    @media (max-width: 720px) {
        p {
            font-size: .8rem;
        }
    }
`

export default function Footer() {
    return (
        <div>
            <div style={{              
                display: 'block',
                padding: '20px',
                height: '80px',
                width: '100%',
            }} />
            <StyledFooter>
                <p>يتم عرض هذه المسلسلات مباشرة من صفحات اليوتيوب الخاصة باصحابها مما يحفظ جميع حقوقهم</p>
            </StyledFooter>
        </div>
    )
}
