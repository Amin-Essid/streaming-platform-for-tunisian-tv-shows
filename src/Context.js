import React, {Component} from 'react';
import finalData from './FinalData';
import WataniaImg from './images/channels/wataniaOne.jpg';
import alhiwarImg from './images/channels/alhiwar.jpg';
import AttessiaImg from './images/channels/attessia.jpg';
import NessmaImg from './images/channels/nessma.jpg';
import HannibalImg from './images/channels/hannibal.jpg';
import WataniaTwoImg from './images/channels/wataniaTwo.jpg';
import CarthagePlus from './images/channels/carthagePlus.jpg';

const ShowsContext = React.createContext();

class ShowsProvider extends Component {
    state = {
        loading: true,
        shows: [],
        type: 'كل الأصناف',
        year:'كل السنوات',
        channel:'كل القنوات',
        selectedShow: null,
        selectedShowEpisodes: [],
        currentSeasonIndex: null,
        currentEpisodeIndex: null,
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
            },
            {
                id: 555,
                name: 'حنبعل',
                img: [HannibalImg],
                type: 'channels'
            },
            {
                id: 666,
                name: 'قرطاج+',
                img: [CarthagePlus],
                type: 'channels'
            },
            {
                id: 777,
                name: 'الوطنية',
                img: [WataniaTwoImg],
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
        let shows = finalData;
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
        }, this.filterShows)
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
        console.log(slug[0])
        if (isNaN(slug[0])) {slug = this.replaceNumbersAt(slug, 7)}
        else {slug = this.replaceNumbersAt(slug, 4)}
        console.log(slug)
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

    // auto select a single show using url
    getSingleShow = (slug) => {
            let selectedShow = this.state.shows.find(show => show.name === slug)
            this.setState({
                selectedShow
            })
    }

    getSelectedShowEpisodes = (episodes) => {
        this.setState({
            selectedShowEpisodes: episodes
        }, () => console.log(this.state.selectedShowEpisodes))
    }

    getCurrentVideoInfo = (seasonIndex, episodeIndex) => {
        this.setState({
            currentEpisodeIndex: episodeIndex,
            currentSeasonIndex: seasonIndex,
        }, () => {
            console.log(this.state.currentEpisodeIndex)
            console.log(this.state.currentSeasonIndex)
        })
    }

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
            <ShowsContext.Provider value = {{...this.state, getShows: this.getShows, getSingleShow: this.getSingleShow, handleChange: this.handleChange, getUnique: this.getUnique, resetData: this.resetData, getSelectedShowEpisodes: this.getSelectedShowEpisodes, getCurrentVideoInfo: this.getCurrentVideoInfo}}>
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
