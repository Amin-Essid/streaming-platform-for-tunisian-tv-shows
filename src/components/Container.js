import React, {Component} from 'react';
import Box from './Box';
import Loading from './Loading';
import styled from 'styled-components';

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    overflow: hidden;
    width:100%;
    min-width:220px;
    max-width:692px;
    margin: 0 0.8em;
`


export default class Container extends Component {
    constructor(props) {
        super(props)
        this.container = React.createRef();

        this.state = {
            width: ''
        }
    }
    

    render(){
        let boxes = this.props.containerShows.map(box => {
            return <Box key={box.id} name={box.name} img = {box.img[0]} boxWidth={this.props.boxWidth} boxHeight={this.props.boxHeight} />
        })
        return (
            <StyledContainer ref={this.container} >
            {this.props.loading ? <Loading /> : boxes}
            </StyledContainer>
        )
    }
    updateDimensions = () => {
        this.setState({ width: this.container.current.offsetWidth}, () => this.props.createBoxes(this.state.width));
      };
    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions()
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }
      
}
