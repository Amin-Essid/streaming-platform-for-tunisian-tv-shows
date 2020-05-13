
import React, { Component } from 'react';
import {ShowsContext} from '../Context';

export default class SingleTvShow extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            show: this.props.match.params.stvs
        }
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            show: nextProps.match.params.stvs
        })
        }

    static contextType = ShowsContext;
    render() {
        return (
            <>
                <h1>{`tv shows: ${this.state.show}`}</h1>
            </>
        )
    }
}

    