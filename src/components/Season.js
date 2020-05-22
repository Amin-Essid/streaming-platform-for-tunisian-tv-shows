import React, { Component } from 'react';
// import styled from 'styled-components';

// const StyledSeason = styled.div`
//   padding: .5em;
//   background-color: #5A668C;
//   color: white;
//   border-radius: 5px;
//   box-shadow: 0 2px 4px grey;
//   & + &{
//     margin-right: .5em;
//   }
//   @media (max-width: 592px) {
//     font-size: .7rem;
//   }
// `



export default class Season extends Component {    
  
    render() {
        let style = 'singleSeason-style';
        if (this.props.seasonNumber === this.props.activeSeason) style='singleSeason-style_active'
        
        return (
            <div className={style} onClick={() => this.props.renderEpisodes(this.props.seasonNumber-1)}>
                {`الموسم ${this.props.seasonNumber}`}
            </div>
        )
    }
}
