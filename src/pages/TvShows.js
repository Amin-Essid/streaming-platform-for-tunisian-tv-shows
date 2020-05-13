import React, { Component } from 'react';
import {ShowsContext} from '../Context';

export default class TvShows extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            showsType: this.props.match.params.showsType
        }
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            showsType: nextProps.match.params.showsType
        })
        }

    static contextType = ShowsContext;
    
    render() {
        return (
            <>
                <h1>{`tv shows: ${this.state.showsType}`}</h1>
            </>
        )
    }
}

