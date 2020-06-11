import React, { PureComponent  } from 'react';
import {withConsumer} from '../Context';
import Video from './Video';
import NextEpisode from './NextEpisode';
import PreviousEpisode from './PreviousEpisode';
import youtube from '../api/Youtube'; 
import {withRouter} from 'react-router-dom';
import Loading from './Loading';
import NextSeason from './NextSeason';
import PreviousSeason from './PreviousSeason';

class Stream extends PureComponent {
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

    getRestOfPlaylist = async (rep, playlistId, selectedShowEpisodes) => {
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
            let allEpisodes = selectedShowEpisodes.concat(response.data.items)
            this.setState({
                selectedShowEpisodes: allEpisodes
            })
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
        const selectedShowEpisodes = response.data.items
        let displayedItems = response.data.pageInfo.resultsPerPage 
        if (response.data.pageInfo.totalResults > displayedItems){
            while (response.data.pageInfo.totalResults > displayedItems) {
                await this.getRestOfPlaylist(response, playlistId, selectedShowEpisodes)
                displayedItems = displayedItems + response.data.pageInfo.resultsPerPage
            }
            getSelectedShowEpisodes(this.state.selectedShowEpisodes)
        } else {
            this.setState({
                selectedShowEpisodes,
              }, () => {
                getSelectedShowEpisodes(this.state.selectedShowEpisodes)  
                })
        }
            
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
        // const {currentEpisode} = this.state
        
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
        const {getCurrentVideoInfo} = this.props.context;
        const {type, show} = this.state;
        window.onpopstate  = async (e) => {
            // await getCurrentVideoInfo(this.state.currentSeasonIndex, this.state.currentEpisodeIndex-1)
            // await this.createOtherEpisodesLink()
            // await this.getDataWhenRefresh()
            // window.history.pushState({name: 'browserBack'}, 'on browser back click', window.location.href);
            // this.props.history.push({ pathname: `/${type}/${show}`});
            this.props.history.push({ pathname: `/${type}/${show}`});
            console.log('aasba')
            // getCurrentVideoInfo(this.state.currentSeasonIndex, this.state.currentEpisodeIndex-1)
            }
    }
    
    render() {
        let {type, show, currentEpisode, selectedShowEpisodes, currentEpisodeIndex, currentSeasonIndex,  selectedShow, prevEpisodeLnk, nextEpisodeLnk, prevVideoTitle, nextVideoTitle} = this.state;
        const {getCurrentVideoInfo} = this.state.context;
        currentEpisode = currentEpisode.split('||||')[1];
        let nextEpisodeIndex = currentEpisodeIndex+1;
        let prevEpisodeIndex = currentEpisodeIndex-1;

        // console.log(selectedShow)
        // console.log(type)
        // console.log(show)
        // console.log(currentEpisode)
        // console.log(selectedShowEpisodes)
        // console.log(currentSeasonIndex)
        // console.log(currentEpisodeIndex)
        // console.log(prevEpisodeIndex)
        // console.log(nextEpisodeIndex)

        let layout = selectedShowEpisodes.length === 0 ? <Loading/> : (
            <div>
            <Video videoId={currentEpisode} />
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
                    </div>
            )
    
             return (
                <>
                   {layout}
                </>
            )
    }
}

export default withRouter(withConsumer(Stream))

