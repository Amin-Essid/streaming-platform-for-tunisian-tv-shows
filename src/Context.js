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
        type: 'كل الأصناف',
        year:'كل السنوات',
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
        filtredShows: [],
        randomNumberToRefresh: Math.random()
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

    resetData = () => {
        this.setState({
            type: 'كل الأصناف',
            year:'كل السنوات',
            channel:'كل القنوات'
        })
    }

    replaceNumbersAt = (str, index) => {
        let fixedString = str.substring(0, index);
        let replacedString = str.substring(index, str.length);
        replacedString  = replacedString.replace('.', '');
        replacedString = replacedString.replace(/\d+/g, '');
        return fixedString + replacedString
    }

    //auto select the shows using the url
    getShows = (slug) => {
        slug = this.replaceNumbersAt(slug, 4)
        if (this.getUnique(this.state.shows, 'type').includes(slug) || slug === 'كل الأصناف'){
            this.setState({
                type :slug,
                year:'كل السنوات',
                channel:'كل القنوات',
                randomNumberToRefresh: Math.random()
            }, this.filterShows)
        } else if (this.getUnique(this.state.shows, 'year').includes(slug) || slug === 'كل السنوات') {
            this.setState({
                year :slug,
                type: 'كل الأصناف',
                channel:'كل القنوات',
                randomNumberToRefresh: Math.random()
            }, this.filterShows) 
        } else if (this.getUnique(this.state.shows, 'channel').includes(slug) || slug === 'كل القنوات'){
            this.setState({
                channel :slug,
                type: 'كل الأصناف',
                year:'كل السنوات',
                randomNumberToRefresh: Math.random()
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
        if(type !== 'كل الأصناف'){
            tempShows = tempShows.filter(show => show.type === type)
        }

        // filter by year
        if(year !== 'كل السنوات'){
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
            <ShowsContext.Provider value = {{...this.state, getShows: this.getShows, handleChange: this.handleChange, getUnique: this.getUnique, resetData: this.resetData}}>
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
