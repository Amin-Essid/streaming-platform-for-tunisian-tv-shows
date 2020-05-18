import React, {Component} from 'react'
import ShowsFilter from './ShowsFilter';
import ShowsList from './ShowsList';
import Loading from './Loading'; 
import {withConsumer} from '../Context';



class ShowsContainer extends Component {
    constructor(props) {
        super(props)

        // const {randomNumberToRefresh} = this.props.context;
        

        this.state = {
             defaultOption: this.props.defaultOption,
             context: this.props.context
        }
    }


    componentDidMount(){
        const {getShows} = this.props.context
        getShows(this.state.defaultOption)
    }

    componentDidUpdate(prevProps, prevState){
        const {getShows} = this.props.context
        if (prevState.defaultOption !== this.props.defaultOption){
            this.setState({
                defaultOption: this.props.defaultOption
            }, () => getShows(this.state.defaultOption))
        }
    }

   


    render(){

        const {loading, filtredShows, shows} = this.props.context

        if(loading){
            return <Loading/>
        }else{
            return (
                <>
                    <ShowsFilter defaultOption={this.state.defaultOption} shows={shows}/>
                    <ShowsList shows={filtredShows}/>
                </>
            )
        }
    }
}

export default withConsumer(ShowsContainer)
