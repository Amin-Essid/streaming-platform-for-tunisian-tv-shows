import React, { Component } from 'react';
import OneShowContainer2 from '../components/OneShowContainer2';
import Error from '../pages/Error';

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
                <Error>
                    <OneShowContainer2 show={this.state.show} />
                </Error>
            </>
        )
    }
}

    