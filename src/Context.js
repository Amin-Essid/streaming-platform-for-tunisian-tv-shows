import React, {Component} from 'react';
import data from './Data';
import WataniaImg from './images/channels/watania.png';
import alhiwarImg from './images/channels/alhiwar.png';
import AttessiaImg from './images/channels/attessia.png';
import NessmaImg from './images/channels/nessma.png';

const ShowsContext = React.createContext();

class ShowsProvider extends Component {
    state = {
        loading: true,
        shows: [],
        channels: [
            {
                id: 111,
                name: 'الوطنية',
                img: [WataniaImg],
                type: 'channels'
            },
            {
                id: 222,
                name: 'الحوار',
                img: [alhiwarImg],
                type: 'channels'
            },
            {
                id: 333,
                name: 'التاسعة',
                img: [AttessiaImg],
                type: 'channels'
            },
            {
                id: 444,
                name: 'نسمة',
                img: [NessmaImg],
                type: 'channels'
            }

        ],
        featuredShows: [],
        dramaShows: [],
        comedyShows: [],
        legendaryShows: [],
        wataniaShows:[],
        alhiwarShows: [],
        attessiaShows: [],
        nessmaShows: [],
        filtredShows: []
    }

    // set the state using the data:
    componentDidMount(){
        let shows = data;
        let featuredShows = shows.filter(show => show.featured);
        let comedyShows = shows.filter(show => show.type === 'كوميديا');
        let dramaShows = shows.filter(show => show.type === 'دراما');
        let attessiaShows = shows.filter(show => show.channel === 'التاسعة');
        let alhiwarShows = shows.filter(show => show.channel === 'الحوار التونسي');
        let wataniaShows = shows.filter(show => show.channel === 'الوطنية');
        let nessmaShows = shows.filter(show => show.channel === 'نسمة');
        let legendaryShows = shows.filter(show => show.legendary);
        this.setState({
            shows,
            featuredShows,
            comedyShows,
            dramaShows,
            attessiaShows,
            alhiwarShows,
            wataniaShows,
            nessmaShows,
            legendaryShows,
            loading: false
        })
        //set the necessery data to the state

    }

    //format the data
    // set the new state
    // create the passed functions to provider

    render(){
        return(
            <ShowsContext.Provider value = {{...this.state}}>
                {this.props.children}
            </ShowsContext.Provider>
        )
    }
}

const ShowsConsumer = ShowsContext.Consumer;

export function withConsumer(Component){
    return function ConsumerWrapper(props) {
        return <ShowsConsumer>
            {value => <Component {...props} context={value}/>}
        </ShowsConsumer>
    }
}

export {ShowsConsumer, ShowsContext, ShowsProvider}
