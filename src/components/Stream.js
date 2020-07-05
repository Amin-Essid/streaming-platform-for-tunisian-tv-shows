import React, { PureComponent  } from 'react';
import {withConsumer} from '../Context';
import Video from './Video';
import NextEpisode from './NextEpisode';
import PreviousEpisode from './PreviousEpisode';
import youtube from '../api/Youtube'; 
import {withRouter} from 'react-router-dom';
import Loading from './Loading';
import AllEpisodes from './AllEpisodes';
import NoInternet from './NoInternet';

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
             nextVideoTitle: null, 
             currentVideoTitle: null,
             noInternet: false
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
                let currentVideoTitle = selectedShowEpisodes[currentEpisodeIndex] ? 
                (selectedShowEpisodes[currentEpisodeIndex].snippet.title) : 'wait'
                this.setState({
                    nextEpisodeLnk,
                    prevEpisodeLnk,
                    prevVideoTitle,
                    nextVideoTitle, 
                    currentVideoTitle
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
                selectedShowEpisodes: allEpisodes,
                noInternet: false
            })
        } catch (err) {
            console.log(err)
            this.setState({
                noInternet: true
              })
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
                noInternet: false
              }, () => {
                getSelectedShowEpisodes(this.state.selectedShowEpisodes)  
                })
        }
            
      } catch (err) {
          console.log(err)
          this.setState({
            noInternet: true
          })
      }
      
    }

    getDataWhenRefresh = async () => {
        let {show, currentEpisode, currentSeasonIndex,  selectedShow} = this.state;
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
        const {type, show} = this.state;
        window.onpopstate  = async (e) => {
            this.props.history.push({ pathname: `/${type}/${show}`});
            console.log('aasba')
            }
    }
    
    render() {
        let {type, show, currentVideoTitle, currentEpisode, selectedShowEpisodes, currentEpisodeIndex, currentSeasonIndex, prevEpisodeLnk, nextEpisodeLnk, prevVideoTitle, nextVideoTitle, noInternet} = this.state;
        const {getCurrentVideoInfo} = this.state.context;
        currentEpisode = currentEpisode.split('||||')[1];
        let nextEpisodeIndex = currentEpisodeIndex+1;
        let prevEpisodeIndex = currentEpisodeIndex-1;

        let layout = selectedShowEpisodes.length === 0 ? <Loading/> : (
            <div>
                <Video videoId={currentEpisode} epTitle={currentVideoTitle} />
                        <div className="otherEpisodes">
                            <PreviousEpisode 
                                videoTitle={prevVideoTitle}
                                lnk={prevEpisodeLnk}
                                getCurrentVideoInfo={getCurrentVideoInfo}
                                seasonIndex={currentSeasonIndex}
                                episodeIndex={prevEpisodeIndex}
                            />
                            <AllEpisodes lnk={`/${type}/${show}`} />   
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
             if (noInternet) {
                 return <NoInternet/>
             } else {
                return (
                    <>
                    {layout}
                    </>
                )
             }
    }
}

export default withRouter(withConsumer(Stream))

