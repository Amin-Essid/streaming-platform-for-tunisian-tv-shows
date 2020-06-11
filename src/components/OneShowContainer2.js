import React, { Component } from 'react';
import Season from './Season';
import Loading from './Loading';
import {withConsumer} from '../Context';
import Episode from './Episode';
import {withRouter} from 'react-router-dom';
import DefaultMovieImg from '../images/icons/defaultMovieImg.png';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import youtube from '../api/Youtube'; 

class OneShowContainer2 extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             context: this.props.context,
             activeSeason: 1,
             selectedShow: null,
             episodes: []
        }
    }

    renderEpisodes = (seasonNumber) => {
        this.setState({
            activeSeason: seasonNumber + 1
        }, ()=> {
            this.getPlaylist(this.state.selectedShow.seasons[this.state.activeSeason - 1])
            console.log(seasonNumber)})
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
                let allEpisodes = this.state.episodes.concat(response.data.items)
                this.setState({
                    episodes: allEpisodes
                }
                ,() => {
                    getSelectedShowEpisodes(this.state.episodes)
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
                  episodes: response.data.items
              },() => {
                let displayedItems = response.data.pageInfo.resultsPerPage 
                while (response.data.pageInfo.totalResults > displayedItems) {
                    this.getRestOfPlaylist(response, playlistId)
                    displayedItems = displayedItems + response.data.pageInfo.resultsPerPage
                }
                getSelectedShowEpisodes(this.state.episodes)
                })
                
          } catch (err) {
              console.log(err)
          }
          
        }



    componentDidMount(){
        const {getSingleShow} = this.props.context;
        this.setState({
            show: this.props.show
        }, ()=>{
            getSingleShow(this.state.show);
        })


    }

    componentDidUpdate(){
        const {context: {selectedShow, getSingleShow}, show} = this.props;
        if (selectedShow !== this.state.selectedShow || show !== this.state.show) {
             this.setState({
                 selectedShow: selectedShow
             }, async () => {
                 console.log("aasba")
                 await getSingleShow(show)
                 this.getPlaylist(this.state.selectedShow.seasons[0])})
        }
    }



    
    render() {
        const {loading, selectedShow, getCurrentVideoInfo} = this.props.context;
        if(loading){
            return <Loading />
        } else {
        return (
            <>
                {
                    (selectedShow === null || this.state.episodes === []) ? ( <Loading />) : (
                    
                        <div className='singleShow-page'>


                            <div className="singleShow-hero">
                                <img src={selectedShow.img[0]} alt="" className="singleShow-img"/>
                                <div className="singleShow-description">
                                    {/* {selectedShow.descripton} */}
                                </div>
                                </div>
                                <div className="seasons-style">
                                    {
                                        selectedShow.seasons.map((season, index) => {
                                            return (
                                                <Season 
                                                    key = {season}
                                                    renderEpisodes={this.renderEpisodes} 
                                                    seasonNumber={index + 1}
                                                    activeSeason={this.state.activeSeason}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            

                                <div className='singleShow-EpisodesContainer'>
                                    <TransitionGroup component={null}>
                                        {
                                            this.state.episodes.map((episode, index) => {
                                                if (episode.snippet.description !== "This video is private."){
                                                    return(
                                                            <CSSTransition
                                                                key={episode.id}
                                                                timeout={150}
                                                                classNames="itemTransition"
                                                            >
                                                                <Episode 
                                                                    key={episode.id}
                                                                    episodeIndex={index} 
                                                                    episodeTitle={episode.snippet.title} 
                                                                    seasonIndex={this.state.activeSeason - 1} 
                                                                    image={episode.snippet.thumbnails.default.url} 
                                                                    playlistItems={this.state.episodes}
                                                                    episodeId={episode}
                                                                    lnk={`/${selectedShow.type}/${selectedShow.name}/${selectedShow.seasons[this.state.activeSeason - 1]}||||${episode.snippet.resourceId.videoId}`}
                                                                    getCurrentVideoInfo={getCurrentVideoInfo}
                                                                />
                                                            </CSSTransition>
                                                    )
                                                }
                                            })
                                        }
                                        </TransitionGroup>
                                </div>
                            </div>
                        )
                    }
                </>
        )
    }
}
}


export default withRouter(withConsumer(OneShowContainer2))