import React from 'react';
import LoadingGif from '../images/icons/Spin-1s-200px.gif';

export default function Loading() {
    return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '3em'}}>
            <img  src={LoadingGif} alt=""/>
        </div>
    )
}
