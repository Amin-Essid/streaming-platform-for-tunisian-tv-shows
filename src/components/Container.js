import React, { Component } from 'react';
import Box from './Box.js'

export default class Container extends Component {
    render() {
        return (
            <div>
                <h3>container</h3>
                <Box />
                <Box />
                <Box />
            </div>
        )
    }
}
