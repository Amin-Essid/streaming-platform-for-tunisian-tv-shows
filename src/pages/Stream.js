import React, { Component } from 'react';
import {withConsumer} from '../Context';
import Video from '../components/Video';
import NextEpisode from '../components/NextEpisode';
import PreviousEpisode from '../components/PreviousEpisode';
import NextSeason from '../components/NextSeason';
import PreviousSeason from '../components/PreviousSeason';

class Stream extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             context: this.props.context,
             currentEpisode: this.props.match.params.stream,
             type: this.props.match.params.showsType,
             show: this.props.match.params.stvs,
             selectedShowEpisodes: this.props.context.selectedShowEpisodes,
             currentEpisodeIndex: this.props.context.currentEpisodeIndex,
             currentSeasonIndex: this.props.context.currentSeasonIndex,
             selectedShow: this.props.context.selectedShow

        }
    }

    static getDerivedStateFromProps(props, state){  
        return ({
                currentEpisode: props.match.params.stream
            })
    }

    componentDidMount() {

    }

    componentDidUpdate(){
        if (this.props.context.currentEpisodeIndex !== this.state.currentEpisodeIndex || this.props.context.currentSeasonIndex !== this.state.currentSeasonIndex) {
            this.setState({
                currentEpisodeIndex: this.props.context.currentEpisodeIndex,
                currentSeasonIndex: this.props.context.currentSeasonIndex,
            })
        }
    }
    
    render() {
        let {type, show, currentEpisode, selectedShowEpisodes, currentEpisodeIndex, currentSeasonIndex,  selectedShow} = this.state;
        const {getCurrentVideoInfo} = this.state.context;
        currentEpisode = currentEpisode.split('||||')[1]
        console.log(selectedShow)
        console.log(type)
        console.log(show)
        console.log(currentEpisode)
        console.log(selectedShowEpisodes)
        console.log(currentSeasonIndex)
        console.log(currentEpisodeIndex)
        console.log(currentEpisodeIndex-1)
        console.log(currentEpisodeIndex+1)

        return (
            <>
                <Video videoId={currentEpisode} />
                <div className="otherEpisodes">
                    <PreviousSeason 
                    season={selectedShow.seasons[currentSeasonIndex - 1]} 
                    
                    />
                    <NextSeason 
                    season={selectedShow.seasons[currentSeasonIndex + 1]}  
                    getCurrentVideoInfo={getCurrentVideoInfo}
                    />
                </div>
                <div className="otherEpisodes">
                    <PreviousEpisode 
                    video={selectedShowEpisodes[currentEpisodeIndex-1]}
                    lnk={`${selectedShow.seasons[currentSeasonIndex]}||||${selectedShowEpisodes[currentEpisodeIndex-1].snippet.resourceId.videoId}`}
                    getCurrentVideoInfo={getCurrentVideoInfo}
                    seasonIndex={currentSeasonIndex}
                    episodeIndex={currentEpisodeIndex-1}
                     />
                    <NextEpisode 
                    video={selectedShowEpisodes[currentEpisodeIndex+1]} 
                    getCurrentVideoInfo={getCurrentVideoInfo} 
                    seasonIndex={currentSeasonIndex}
                    episodeIndex={currentEpisodeIndex+1}
                    lnk = {`${selectedShow.seasons[currentSeasonIndex]}||||${selectedShowEpisodes[currentEpisodeIndex+1].snippet.resourceId.videoId}`}
                    />
                </div>
            </>
        )
    }
}

export default withConsumer(Stream)

