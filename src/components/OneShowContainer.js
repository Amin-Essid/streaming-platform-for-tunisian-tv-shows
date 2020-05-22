import React, { Component } from 'react';
import Season from './Season';
import Loading from './Loading';
import {withConsumer} from '../Context';
import Episode from './Episode';
import DefaultMovieImg from '../images/icons/defaultMovieImg.png';

class OneShowContainer extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             context: this.props.context,
             activeSeason: 1
        }
    }

    renderEpisodes = (seasonNumber) => {
        this.setState({
            activeSeason: seasonNumber + 1
        }, ()=> {console.log(seasonNumber)})
    }


    componentDidMount(){
        const {getSingleShow} = this.props.context;
        this.setState({
            show: this.props.show
        }, ()=>{
            getSingleShow(this.state.show)
        })

    }


    
    render() {
        const {loading, selectedShow} = this.props.context
        if(loading){
            return <Loading />
        } else {
        return (
            <>
                {
                    (selectedShow === null) ? ( <Loading />) : (
                    
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
                                                    key = {season.season_id}
                                                    renderEpisodes={this.renderEpisodes} 
                                                    seasonNumber={season.season_id}
                                                    activeSeason={this.state.activeSeason}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            

                                <div className='singleShow-EpisodesContainer'>
                                    {
                                        selectedShow.seasons[this.state.activeSeason-1].episodes.map(episode => {
                                            return(
                                                <Episode 
                                                    key={episode.ep_id}
                                                    episodeNumber={episode.ep_id} 
                                                    seasonNumber={selectedShow.seasons[this.state.activeSeason-1].season_id} 
                                                    image={DefaultMovieImg} 
                                                    lnk={`/${selectedShow.type}/${selectedShow.name}/حلقة${episode.ep_id}`}
                                                />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }
                </>
        )
    }
}
}


export default withConsumer(OneShowContainer)