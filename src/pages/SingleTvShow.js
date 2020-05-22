
import React, { Component } from 'react';
import OneShowContainer from '../components/OneShowContainer'

export default class SingleTvShow extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            show: this.props.match.params.stvs
        }
    }
    

    static getDerivedStateFromProps(props, state){  
        return ({
                show: props.match.params.stvs
                })
    }


    render() {


        return (
            <>
                <OneShowContainer show={this.state.show} />
            </>
        )
    }
}

    