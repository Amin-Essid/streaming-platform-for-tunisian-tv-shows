import React, { Component } from 'react';
import {withConsumer} from '../Context';
import Video from '../components/Video';

class Stream extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             context: this.props.context,
             currentEpisode: this.props.match.params.stream
        }
    }

    static getDerivedStateFromProps(props, state){  
        return ({
                currentEpisode: props.match.params.stream
            })
    }
    
    render() {
        return (
            <React.Fragment>
                <Video videoId ={this.state.currentEpisode} />
            </React.Fragment>
        )
    }
}

export default withConsumer(Stream)

