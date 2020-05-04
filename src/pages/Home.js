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
            <Section loading={loading} sectionShows={featuredShows} arrowSize="big" containerSize="" boxSize=""/>
            {/* <ButtonsContainer/>
            <Section sectionShows={channels} arrowSize="big" containerSize="" boxSize=""/>
            <ButtonsContainer/>
            <Section sectionShows={legendaryShows} arrowSize="big" containerSize="" boxSize=""/>
            <ButtonsContainer/>
            <Section sectionShows={comedyShows} arrowSize="big" containerSize="" boxSize=""/>
            <ButtonsContainer/>
            <Section sectionShows={dramaShows} arrowSize="big" containerSize="" boxSize=""/> */}
        </>
    )
}
