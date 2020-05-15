import React from 'react'
import ShowsFilter from './ShowsFilter';
import ShowsList from './ShowsList';
import Loading from './Loading'; 
import {withConsumer} from '../Context';
import {useEffect} from 'react';



function ShowsContainer({context, defaultSelect}) {
    const {loading, filtredShows, shows, getShows} = context;

        //auto select the shows using the url
    useEffect( () => getShows(defaultSelect), [])


    if(loading){
        return <Loading/>
    }else{
        return (
            <>
                <ShowsFilter shows={shows}/>
                <ShowsList shows={filtredShows}/>
            </>
        )
    }
}

export default withConsumer(ShowsContainer)
