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
             selectedShow: this.props.context.selectedShow,
             nextEpisodeLnk: null,
             prevEpisodeLnk: null,
             prevVideoTitle: null,
            nextVideoTitle: null

        }
    }

    static getDerivedStateFromProps(props, state){  
        return ({
                currentEpisode: props.match.params.stream
            })
    }

    createOtherEpisodesLink = () => {
        let {selectedShowEpisodes, currentEpisodeIndex, currentSeasonIndex,  selectedShow} = this.state;
                let nextEpisodeIndex = currentEpisodeIndex+1;
                let prevEpisodeIndex = currentEpisodeIndex-1;
                let nextEpisodeLnk = nextEpisodeIndex < selectedShowEpisodes.length ? 
                (`${selectedShow.seasons[currentSeasonIndex]}||||${selectedShowEpisodes[nextEpisodeIndex].snippet.resourceId.videoId}`) : '#';
                let prevEpisodeLnk = prevEpisodeIndex >= 0 ? 
                (`${selectedShow.seasons[currentSeasonIndex]}||||${selectedShowEpisodes[prevEpisodeIndex].snippet.resourceId.videoId}`) : '#';
                let prevVideoTitle  = selectedShowEpisodes[prevEpisodeIndex] ? 
                (selectedShowEpisodes[prevEpisodeIndex].snippet.title) : 'nowhere'
                let nextVideoTitle  = selectedShowEpisodes[nextEpisodeIndex] ? 
                (selectedShowEpisodes[nextEpisodeIndex].snippet.title) : 'nowhere'
                console.log(prevEpisodeIndex)
                this.setState({
                    nextEpisodeLnk,
                    prevEpisodeLnk,
                    prevVideoTitle,
                    nextVideoTitle
                })
    }

    componentDidMount() {
        this.createOtherEpisodesLink()
        // let {type, show, currentEpisode, selectedShowEpisodes, currentEpisodeIndex, currentSeasonIndex,  selectedShow} = this.state;

        // let nextEpisodeIndex = currentEpisodeIndex+1;
        // let prevEpisodeIndex = currentEpisodeIndex-1;
        // let nextEpisodeLnk = nextEpisodeIndex < selectedShowEpisodes.length ? 
        // (`${selectedShow.seasons[currentSeasonIndex]}||||${selectedShowEpisodes[nextEpisodeIndex].snippet.resourceId.videoId}`) : null;
        // let prevEpisodeLnk = prevEpisodeIndex >= 0 ? 
        // (`${selectedShow.seasons[currentSeasonIndex]}||||${selectedShowEpisodes[prevEpisodeIndex].snippet.resourceId.videoId}`) : null;
    }

    componentDidUpdate(){
        if (this.props.context.currentEpisodeIndex !== this.state.currentEpisodeIndex || this.props.context.currentSeasonIndex !== this.state.currentSeasonIndex) {
            this.setState({
                currentEpisodeIndex: this.props.context.currentEpisodeIndex,
                currentSeasonIndex: this.props.context.currentSeasonIndex,
            }, ()=>{
                this.createOtherEpisodesLink()})
            }
    }
    
    render() {
        let {type, show, currentEpisode, selectedShowEpisodes, currentEpisodeIndex, currentSeasonIndex,  selectedShow, prevEpisodeLnk, nextEpisodeLnk, prevVideoTitle, nextVideoTitle} = this.state;
        const {getCurrentVideoInfo} = this.state.context;
        currentEpisode = currentEpisode.split('||||')[1]
        // console.log(selectedShow)
        // console.log(type)
        // console.log(show)
        // console.log(currentEpisode)
        // console.log(selectedShowEpisodes)
        // console.log(currentSeasonIndex)
        // console.log(currentEpisodeIndex)
        // console.log(currentEpisodeIndex-1)
        // console.log(currentEpisodeIndex+1)
        let nextEpisodeIndex = currentEpisodeIndex+1;
        let prevEpisodeIndex = currentEpisodeIndex-1;
        // let nextEpisodeLnk = nextEpisodeIndex < selectedShowEpisodes.length ? 
        // (`${selectedShow.seasons[currentSeasonIndex]}||||${selectedShowEpisodes[nextEpisodeIndex].snippet.resourceId.videoId}`) : null;
        // let prevEpisodeLnk = prevEpisodeIndex >= 0 ? 
        // (`${selectedShow.seasons[currentSeasonIndex]}||||${selectedShowEpisodes[prevEpisodeIndex].snippet.resourceId.videoId}`) : null;

        return (
            <>
                <Video videoId={currentEpisode} />
                {/* <div className="otherEpisodes">
                <PreviousSeason 
                    season={`الموسم${currentSeasonIndex - 1}`} 
                    getCurrentVideoInfo={getCurrentVideoInfo}
                    lnk = {prevEpisodeLnk}
                    seasonIndex={currentSeasonIndex - 1}
                    episodeIndex={1}
                    />
                <NextSeason 
                    season={`الموسم${currentSeasonIndex + 1}`}   
                    getCurrentVideoInfo={getCurrentVideoInfo}
                    lnk = {`${selectedShow.seasons[currentSeasonIndex + 1]}||||${selectedShowEpisodes[1].snippet.resourceId.videoId}`}
                    seasonIndex={currentSeasonIndex + 1}
                    episodeIndex={1}
                    />
                </div> */}
                <div className="otherEpisodes">
                    <PreviousEpisode 
                    videoTitle={prevVideoTitle}
                    lnk={prevEpisodeLnk}
                    getCurrentVideoInfo={getCurrentVideoInfo}
                    seasonIndex={currentSeasonIndex}
                    episodeIndex={prevEpisodeIndex}
                     />
                    <NextEpisode 
                    videoTitle={nextVideoTitle} 
                    getCurrentVideoInfo={getCurrentVideoInfo} 
                    seasonIndex={currentSeasonIndex}
                    episodeIndex={nextEpisodeIndex}
                    lnk = {nextEpisodeLnk}
                    />
                </div>
            </>
        )
    }
}

export default withConsumer(Stream)

