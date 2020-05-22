import React, { Component } from 'react';
import {ShowsContext} from '../Context';
import ShowsContainer from '../components/ShowsContainer';

export default class TvShows extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            showsType: props.match.params.showsType
        }
    }
    
    static getDerivedStateFromProps(props, state){  
        return ({
                showsType: props.match.params.showsType
                })
    }


    static contextType = ShowsContext;


    
    render() {
        return (
            <>
                <ShowsContainer defaultOption={this.state.showsType.replace('-', ' ')} randomNumberToRefresh={this.state.randomNumberToRefresh} />
            </>
        )
    }
}

