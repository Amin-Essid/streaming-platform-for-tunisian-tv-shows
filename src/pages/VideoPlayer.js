
import React, { Component } from 'react';
import Stream from '../components/Stream';

export default class SingleTvShow extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            type: this.props.match.params.showsType,
            show: this.props.match.params.stvs,
            stream: this.props.match.params.stream
        }
    }
    

    static getDerivedStateFromProps(props, state){  
        return ({
                stream: props.match.params.stream
                })
    }

    // componentDidUpdate(){
    //     const {type, show} = this.state;
    //     window.addEventListener('popstate', (event) => {
    //         this.props.history.replace({ pathname: `/${type}/${show}`});
    //         this.props.history.replace({ pathname: `/${type}/${show}`});
    //         console.log('aasba')
    //         });
    // }

    // componentDidMount(){
    //     const {type, show} = this.state;
    //     window.addEventListener('popstate', (event) => {
    //         this.props.history.push({ pathname: `/${type}/${show}`});
    //         console.log('aasba')
    //         });
    // }

    //     componentWillMount(){
    //     const {type, show} = this.state;
    //     window.addEventListener('popstate', (event) => {
    //         this.props.history.replace({ pathname: `/${type}/${show}`});
    //         this.props.history.replace({ pathname: `/${type}/${show}`});
    //         console.log('aasba')
    //         });
    // }



    render() {

        return (
            <>
                <Stream/>
            </>
        )
    }
}

    