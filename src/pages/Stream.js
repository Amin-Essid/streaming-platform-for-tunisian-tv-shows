import React, { Component } from 'react';
import {withConsumer} from '../Context';
import Video from '../components/Video';
import NextEpisode from '../components/NextEpisode';
import PreviousEpisode from '../components/PreviousEpisode';
import youtube from '../api/Youtube'; 
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
        if (selectedShow !== null) {
            // console.log(selectedShow)
        // if (this.props.context.selectedShow !== null) console.log(this.props.context.selectedShow)
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
                this.setState({
                    nextEpisodeLnk,
                    prevEpisodeLnk,
                    prevVideoTitle,
                    nextVideoTitle
                })
            }
    }

    getRestOfPlaylist = async (rep, playlistId) => {
        const {getSelectedShowEpisodes} = this.props.context;
        try {
            const response = await youtube.get('playlistItems', {
              params: {
                part: 'snippet',
                maxResults: 50,
                pageToken: rep.data.nextPageToken,
                playlistId: playlistId,
                key: 'AIzaSyB4R8zkjTG79Wc_s2pnJlqzZrwb-IbHIVI',
              }
          })
            let allEpisodes = this.state.selectedShowEpisodes.concat(response.data.items)
            this.setState({
                selectedShowEpisodes: allEpisodes
            }
            ,() => {
                getSelectedShowEpisodes(this.state.selectedShowEpisodes)
             }
            
            )
        } catch (err) {
            console.log(err)
        }
    
}


getPlaylist = async (playlistId) => {
    const {getSelectedShowEpisodes} = this.props.context;
    try {
          const response = await youtube.get('playlistItems', {
            params: {
              part: 'snippet',
              maxResults: 50,
              playlistId: playlistId,
              key: 'AIzaSyB4R8zkjTG79Wc_s2pnJlqzZrwb-IbHIVI',
            }
        })
          this.setState({
            selectedShowEpisodes: response.data.items
          },() => {
            let displayedItems = response.data.pageInfo.resultsPerPage 
            while (response.data.pageInfo.totalResults > displayedItems) {
                this.getRestOfPlaylist(response, playlistId)
                displayedItems = displayedItems + response.data.pageInfo.resultsPerPage
            }
            getSelectedShowEpisodes(this.state.selectedShowEpisodes)
            })
            
      } catch (err) {
          console.log(err)
      }
      
    }

    getDataWhenRefresh = async () => {
        let {type, show, currentEpisode, currentSeasonIndex,  selectedShow} = this.state;
        const {getSingleShow, getCurrentVideoInfo} = this.props.context;

        
        if (selectedShow === null) {

            this.setState({
             show: this.props.match.params.stvs,
            }, async () => {
            await getSingleShow(show)
            this.setState({
                selectedShow: this.props.context.selectedShow
            }, async () => {
                let currentSeason = currentEpisode.split('||||')[0];
                currentEpisode = currentEpisode.split('||||')[1];
                if (currentSeasonIndex === null) {
                currentSeasonIndex = this.state.selectedShow.seasons.findIndex(s => s === currentSeason)
                this.setState({
                    currentEpisode,
                    currentSeasonIndex
                })
                }
                await this.getPlaylist(this.state.selectedShow.seasons[currentSeasonIndex])
                console.log(this.props.context.selectedShowEpisodes)
                let currentEpisodeIndex = this.props.context.selectedShowEpisodes.findIndex(ep => ep.snippet.resourceId.videoId === currentEpisode)
                console.log(this.props.context.selectedShowEpisodes)
                console.log(currentEpisodeIndex)
                await getCurrentVideoInfo(currentSeasonIndex, currentEpisodeIndex)
                this.setState({
                    currentEpisodeIndex,
                    selectedShowEpisodes: this.props.context.selectedShowEpisodes
                }, () => console.log(this.props.context.selectedShowEpisodes))
                this.createOtherEpisodesLink(this.state.currentSeasonIndex)
            })
            })
        } else {
            this.createOtherEpisodesLink()

        }
        
    }

    componentDidMount() {
        this.getDataWhenRefresh()
        

       
    }

    componentDidUpdate(){
        const {currentEpisode} = this.state
        if (this.props.context.currentEpisodeIndex !== this.state.currentEpisodeIndex || this.props.context.currentSeasonIndex !== this.state.currentSeasonIndex) {
            this.setState({
                currentEpisodeIndex: this.props.context.currentEpisodeIndex,
                currentSeasonIndex: this.props.context.currentSeasonIndex,
            }, ()=>{
                this.createOtherEpisodesLink()})
            }
        if(this.props.context.selectedShow !== this.state.selectedShow){
            this.setState({
                selectedShow: this.props.context.selectedShow
            })
        }
        // if(this.state.selectedShowEpisodes !== this.props.context.selectedShowEpisodes) {
        //     this.setState({
        //     selectedShowEpisodes: this.props.context.selectedShowEpisodes
        //     }, ()=>{
        //         let currentEpisodeIndex = this.props.context.selectedShowEpisodes.findIndex(ep => ep.snippet.resourceId.videoId === currentEpisode)
        //         this.setState({
        //             currentEpisodeIndex
        //         }, () => this.createOtherEpisodesLink())
        //         })
        // }
    }
    
    render() {
        let {type, show, currentEpisode, selectedShowEpisodes, currentEpisodeIndex, currentSeasonIndex,  selectedShow, prevEpisodeLnk, nextEpisodeLnk, prevVideoTitle, nextVideoTitle} = this.state;
        const {getCurrentVideoInfo} = this.state.context;
        currentEpisode = currentEpisode.split('||||')[1];

        // console.log(selectedShow)
        // console.log(type)
        // console.log(show)
        // console.log(currentEpisode)
        console.log(selectedShowEpisodes)
        // console.log(currentSeasonIndex)
        // console.log(currentEpisodeIndex)
        let nextEpisodeIndex = currentEpisodeIndex+1;
        let prevEpisodeIndex = currentEpisodeIndex-1;
        // console.log(prevEpisodeIndex)
        // console.log(nextEpisodeIndex)
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

