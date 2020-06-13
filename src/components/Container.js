import React, {Component} from 'react';
import Box from './Box';
import Loading from './Loading';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    width:100%;
    min-width:${props => props.boxWidth};
    max-width: ${props => props.containerMaxWidth};
    margin: 0 0.8em;
    overflow: hidden;
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
        const {containerShows, boxWidth, boxHeight, boxContentStyle, containerMaxWidth, loading} = this.props
        let boxes = containerShows.map(box => {
            let lnk = '';
            if (box.type === 'channels') lnk = `/${box.name}`
            else lnk = `/${box.type}/${box.name}`
            return (
                
                        <CSSTransition
                            key={box.id}
                            timeout={150}
                            classNames="fade"
                        >
                            <Box 
                                key={box.id} 
                                name={box.name} 
                                img = {box.img[0]}
                                lnk={lnk}
                                boxWidth={boxWidth} 
                                boxHeight={boxHeight} 
                                boxLinkStyle='boxLink'
                                boxContentStyle={boxContentStyle}
                            />
                        </CSSTransition>
                
            )
        })
        return (
        
            <StyledContainer 
            boxWidth={boxWidth} 
            containerMaxWidth={containerMaxWidth} 
            ref={this.container} 
            >
            
            {loading ? <Loading /> : (
                <TransitionGroup component={null}>
               {boxes}
                </TransitionGroup>
                )}
            
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
