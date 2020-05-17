import React, { Component } from 'react';
import {ShowsContext} from '../Context';
import ShowsContainer from '../components/ShowsContainer';

export default class TvShows extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            showsType: this.props.match.params.showsType.replace('-', ' ')
        }
    }
    
    static getDerivedStateFromProps(props, state){
        return {showsType: props.match.params.showsType.replace('-', ' ')}
    }


    static contextType = ShowsContext;


    
    render() {
        return (
            <>
                <ShowsContainer defaultOption={this.state.showsType} />
            </>
        )
    }
}

