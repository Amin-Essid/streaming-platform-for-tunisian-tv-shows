import React, { Component } from 'react';
import Box from './Box';
import Loading from './Loading';


export default class Container extends Component {
    render() {
        return (
            <div>
            {this.props.loading ? <Loading /> : <Box name = {this.props.containerShows[0].name}/>}
            </div>
        )
    }
}
