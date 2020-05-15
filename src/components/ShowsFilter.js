import React, { Component } from 'react'; 
import {ShowsContext} from '../Context';





export default class ShowsFilter extends Component {
    static contextType = ShowsContext;
    render() {

        const {shows, type, year, channel, handleChange, getUnique} = this.context;

        let types = getUnique(shows, 'type');
        types = ['كل المسلسلات', ...types];
        types = types.map((item,index)=>{
            return <option value={item} key={index}>{item}</option>
        });


        let years = getUnique(shows, 'year');
        years = years.sort((a, b) => {return parseInt(b) - parseInt(a)});
        years = ['الكل', ...years];
        years = years.map((item,index)=>{
            return <option value={item} key={index}>{item}</option>
        });


        let channels = getUnique(shows, 'channel');
        channels = ['كل القنوات', ...channels];
        channels = channels.map((item,index)=>{
            return <option value={item} key={index}>{item}</option>
        });



        return (
            <section className="filter-container">
            {/* <Title title="search-rooms" /> */}
            <form className="filter-form">
             
                <div className="form-group">
                    <label htmlFor="type">النوع</label>
                    <select name="type" id="type" 
                    value={type} className="form-control" onChange={handleChange} >
                         {types}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="type">التاريخ</label>
                    <select name="year" id="year" 
                    value={year} className="form-control" onChange={handleChange}>
                         {years}
                    </select>
                </div>


                <div className="form-group">
                    <label htmlFor="type">القناة</label>
                    <select name="channel" id="channel" 
                    value={channel} className="form-control" onChange={handleChange}>
                         {channels}
                    </select>
                </div>
            </form>
        </section>
        )
    }
}
