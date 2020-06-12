import React from 'react';
import Section from '../components/Section';
import ButtonsContainer from '../components/ButtonsContainer';
import {ShowsContext} from '../Context';
import {useContext} from "react";
export default function Home() {
    const context = useContext(ShowsContext);
    let {loading, featuredShows, comedyShows, dramaShows, legendaryShows, channels} = context;
    return (
        <>
            <Section 
                containerMaxWidth="860px" 
                loading={loading} 
                sectionShows={featuredShows} 
                arrowSize="50px" 
                boxWidth='200px' 
                boxHeight='250px'
            />
            <ButtonsContainer 
                links={['2020', 'كل-الأصناف']}
                buttonsContent={['رمضان 2020', 'كل المسلسلات']} 
                buttonsWidth={['130px', '130px']} 
                buttonsHeight={['43px', '43px']} 
                buttonsStyle={['primary-button', 'secondary-button']} 
                buttonsMargin={['2.9em', '2.9em']}
            />
            <Section 
                containerMaxWidth="340px" 
                loading={loading} 
                sectionShows={channels} 
                arrowSize="35px" 
                boxWidth='100px' 
                boxHeight='100px'
            />
            <ButtonsContainer 
            links={['قبل2011', 'قبل2011']}
                buttonsContent={['مسلسلات زمان', 'المزيد']} 
                buttonsWidth={['130px', '70px']} 
                buttonsHeight={['35px', '35px']} 
                buttonsStyle={['primary-button', 'secondary-button']} 
                buttonsMargin={['4em', '1.5em']} 
            />
            <Section 
                containerMaxWidth="860px" 
                loading={loading} 
                sectionShows={legendaryShows} 
                arrowSize="45px" 
                boxWidth='200px' 
                boxHeight='250px'
            />
            <ButtonsContainer 
                links={['كوميديا', 'كوميديا']}
                buttonsContent={['كوميديا', 'المزيد']} 
                buttonsWidth={['130px', '70px']} 
                buttonsHeight={['35px', '35px']} 
                buttonsStyle={['primary-button', 'secondary-button']} 
                buttonsMargin={['4em', '1.5em']} 
            />
            <Section 
                containerMaxWidth="860px" 
                loading={loading} 
                sectionShows={comedyShows} 
                arrowSize="45px" 
                boxWidth='200px' 
                boxHeight='250px'
            />
            <ButtonsContainer 
                links={['دراما', 'دراما']}
                buttonsContent={['دراما', 'المزيد']} 
                buttonsWidth={['130px', '70px']} 
                buttonsHeight={['35px', '35px']} 
                buttonsStyle={['primary-button', 'secondary-button']} 
                buttonsMargin={['4em', '1.5em']} 
            />
            <Section 
                containerMaxWidth="860px" 
                loading={loading} 
                sectionShows={dramaShows} 
                arrowSize="45px" 
                boxWidth='200px' 
                boxHeight='250px'
            />
        </>
    )
}
