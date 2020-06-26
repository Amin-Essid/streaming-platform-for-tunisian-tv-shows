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
                boxWidth='180px' 
                boxHeight='240px'
                boxContentStyle='boxContentStyle'
                boxContentStyleBorder='3px solid #5A668C'
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
                containerMaxWidth="580px" 
                loading={loading} 
                sectionShows={channels} 
                arrowSize="35px" 
                boxWidth='75px' 
                boxHeight='75px'
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
                boxWidth='180px' 
                boxHeight='240px'
                boxContentStyle='boxContentStyle'
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
                boxWidth='180px' 
                boxHeight='240px'
                boxContentStyle='boxContentStyle'
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
                boxWidth='180px' 
                boxHeight='240px'
                boxContentStyle='boxContentStyle'
            />
        </>
    )
}
