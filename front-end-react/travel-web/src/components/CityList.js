import * as React from 'react';
import { Carousel } from 'antd';

import '../styles/CityList.css';

const cityList = [
    {name: "London", latlng: {lat: 51.506155, lng: -0.127824}},
    {name: "Paris",  latlng: {lat: 48.854429, lng: 2.352198}},
    {name: "Milano", latlng: {lat: 45.461719, lng: 9.190091}},
    {name: "Munich", latlng: {lat: 48.133679, lng: 11.580960}}
];

export class CityList extends React.Component {

    onChange = (page) => {
        this.props.getPage(page, cityList[page].name, cityList[page].latlng);
    }

    render() {
        return(
            <div>
                <Carousel dotPosition="left" afterChange={this.onChange} autoplay={false}>
                    <div>
                        <h1>London</h1>
                    </div>
                    <div>
                        <h1>Paris</h1>
                    </div>
                    <div>
                        <h1>Milano</h1>
                    </div>
                    <div>
                        <h1>Munich</h1>
                    </div>
                </Carousel>
            </div>
        );
    }
}