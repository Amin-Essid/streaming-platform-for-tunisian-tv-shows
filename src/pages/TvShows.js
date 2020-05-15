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
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            showsType: nextProps.match.params.showsType.replace('-', ' ')
        })
        }

    static contextType = ShowsContext;


    
    render() {
        return (
            <>
                <ShowsContainer defaultSelect={this.state.showsType} />
            </>
        )
    }
}

