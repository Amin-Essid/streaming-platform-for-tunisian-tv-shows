import React, { Component } from 'react'; 
import {ShowsContext} from '../Context';





export default class ShowsFilter extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             type: '',
             year: '', 
             channel: '',
             channels: '',
             years: '',
             types: '',
             defaultOption: this.props.defaultOption
        }
    }
    

    
    static contextType = ShowsContext;

    componentDidMount(){
        const {shows, type, year, channel, getUnique} = this.context;

        let types = getUnique(shows, 'type');
        types = ['كل الأصناف', ...types];
        types = types.map((item,index)=>{
            return <option value={item} key={index}>{item}</option>
        });


        let years = getUnique(shows, 'year');
        years = years.sort((a, b) => {return parseInt(b) - parseInt(a)});
        years = ['كل السنوات', ...years];
        years = years.map((item,index)=>{
            return <option value={item} key={index}>{item}</option>
        });


        let channels = getUnique(shows, 'channel');
        channels = ['كل القنوات', ...channels];
        channels = channels.map((item,index)=>{
            return <option value={item} key={index}>{item}</option>
        });
        this.setState({
            type,
            channel,
            year,
            types,
            channels,
            years
        })
    }


    componentDidUpdate(prevProps, prevState){
        const {type, year, channel} = this.context;
        if(prevState.type !== type || prevState.year !== year || prevState.channel !== channel){
            this.setState({
                type,
                year,
                channel
            })
        }

    }

    componentWillUnmount(){
        const {resetData} = this.context
        resetData()
    }


    render() {
        const {handleChange} = this.context
        return (
            <section className="filter-container">
            {/* <Title title="search-rooms" /> */}
            <form className="filter-form">
             
                <div className="form-group">
                    <label htmlFor="type">الصنف</label>
                    <select 
                    style={{border: this.state.type !== 'كل الأصناف' ? 
                    '2px solid #BF1515' : '0.8px solid grey'}} 
                    name="type" id="type" 
                    value={this.state.type} 
                    className="form-control" 
                    onChange={handleChange} >
                         {this.state.types}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="type">التاريخ</label>
                    <select
                    style={{border: this.state.year !== 'كل السنوات' ? 
                    '2px solid #BF1515' : '0.8px solid grey'}} 
                    name="year" id="year" 
                    value={this.state.year} 
                    className="form-control" 
                    onChange={handleChange}>
                         {this.state.years}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="type">القناة</label>
                    <select 
                    style={{border: this.state.channel !== 'كل القنوات' ? 
                    '2px solid #BF1515' : '0.8px solid grey'}} 
                    name="channel" id="channel" 
                    value={this.state.channel} 
                    className="form-control" 
                    onChange={handleChange}>
                         {this.state.channels}
                    </select>
                </div>
            </form>
        </section>
        )
    }
}
