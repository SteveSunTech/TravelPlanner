import React from 'react';
import PropTypes from 'prop-types';
// import {mergeChildren} from './ListSort';
import ListSort from './ListSort';
import {Button, message} from 'antd';

import '../styles/SpotsList.css';
import {API_ROOT, AUTH_HEADER, TOKEN_KEY, USER_ID} from "../constants"

export class DayList extends React.Component {

    static defaultProps = {
        className: 'list-sort-demo',
    };

    getListSort=(ref)=>{
        this.sortListRef = ref;
    }

    returnSpotsList=()=>{
        return this.sortListRef.returnList();
    }

    deletePlan = (idx)=>{
        console.log(idx+1, this.returnSpotsList())
        fetch(`${API_ROOT}/saveroutes`,{
            method: 'DELETE',
            headers: {
                Authorization: `${AUTH_HEADER} ${localStorage.getItem(TOKEN_KEY)}`,
            },
            body: JSON.stringify({
                user_id: localStorage.getItem(USER_ID),
                ithDay: idx+1
            }),
        })
            .then((response)=>{
                if(response.ok){
                    return response.json();
                }
                throw new Error('Failed to delete.');
            }).then(
            (history)=>{
                console.log(this.props.plans.length);
                this.props.planRemoveIdx(idx); ////rerender
            }
        ).catch((e) => {
            console.log(e)
        });
    }

    gotoDay = (ithDay) =>{
        this.props.setDay(ithDay);
        this.props.hide();
    }

    render() {
        const childrenToRender = this.props.plans.map((item, index) => {
            item = item.map((content)=>(content.name))
            // ["place1","", ""]
            return (
                <div key={index} className={`${this.props.className}-list`}>
                    {/*{path}*/}
                    <h3 className={"start"}>{`start from: ${item[0]}`}</h3>
                    {item.slice(1).map((name, idx)=>(<p className="station" key={idx}>{`Station ${idx+1}: ${name}`}</p>))}
                </div>
            )
        });

        const days = this.props.plans.map((content, idx)=>(
            <div key = {idx}>
                <h4 className="day">{`Day ${idx+1}`}</h4>
                <Button type="link" onClick={()=>this.gotoDay(idx+1)}>{`Go To Plan`}</Button>
                <br/>
                <Button type="dashed" onClick={()=>this.deletePlan(idx)}>Delete</Button>
            </div>
        ))
        return (
            <div className={`${this.props.className}-div ${this.props.className}-wrapper planOverView`}>
                {/*<div className={`${this.props.className}-wrapper`}>*/}
                <div>
                    {days}
                </div>
                <div className="sliders" >
                    <ListSort ref={this.getListSort}
                              dragClassName="list-drag-selected"
                              appearAnim = {{ animConfig: { marginTop: [5, 30], opacity: [1, 0] } }}>
                        {childrenToRender}
                    </ListSort>
                </div>
            </div>
        );
    }
}



