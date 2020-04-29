import React, { Component } from 'react';
import Container from './Container.js';
import Arrow from './Arrow.js';
import NormalButton from './NormalButton.js';

export default class Section extends Component {
    render() {
        return (
            <div>
                <h2>section</h2>
                <Arrow/>
                <Container/>
                <Arrow/>
                <NormalButton />
                <NormalButton />
            </div>
        )
    }
}
