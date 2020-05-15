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
        type: 'كل المسلسلات',
        year:'الكل',
        channel:'كل القنوات',
        channels: [
            {
                id: 111,
                name: 'الوطنية',
                img: [WataniaImg],
                type: 'channels'
            },
            {
                id: 222,
                name: 'الحوار التونسي',
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
    }



    // get types and years
    getUnique = (items, value) => {
        return [...new Set(items.map(item => item[value]))]
    }    

    //auto select the shows using the url
    getShows = (slug) => {
        if (this.getUnique(this.state.shows, 'type').includes(slug)){
            this.setState({
                type :slug
            }, this.filterShows)
        } else if (this.getUnique(this.state.shows, 'year').includes(slug)) {
            this.setState({
                year :slug
            }, this.filterShows) 
        } else {
            this.setState({
                channel :slug
            }, this.filterShows) 
        }
    };

    handleChange = event => {
        const target = event.target;
        const value = target.value;
        const name = event.target.name;
        this.setState({
            [name] :value
        }, this.filterShows)
        
    }

    filterShows = () => {
        let {        
            type,
            shows,
            year, 
            channel} = this.state

        // all the rooms
        let tempShows = [...shows];


        // filter by type
        if(type !== 'كل المسلسلات'){
            tempShows = tempShows.filter(show => show.type === type)
        }

        // filter by year
        if(year !== 'الكل'){
            tempShows = tempShows.filter(show => show.year === year)
        }  
        
        // filter by type
        if(channel !== 'كل القنوات'){
            tempShows = tempShows.filter(show => show.channel === channel)
        }        


        // change state
        this.setState({
            filtredShows: tempShows
        })
    }


    render(){
        return(
            <ShowsContext.Provider value = {{...this.state, getShows: this.getShows, handleChange: this.handleChange, getUnique: this.getUnique}}>
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
