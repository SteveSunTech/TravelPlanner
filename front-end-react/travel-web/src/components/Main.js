import React from 'react';
import { Register } from './Register';
import { Login } from './Login';


import { Switch, Route, Redirect } from 'react-router-dom'
import {ChooseCity} from './ChooseCity'
import {Plan} from './Plan'
import {Test} from './GoogleMapTest'

export class Main extends React.Component {
    city = {name: "Los Angeles ", latlng: {lat: 34.0522, lng: -118.2437}}

    getLogin = () => {
        return this.props.isLoggedIn ? <Redirect to="/city"/> : <Login handleLogin={this.props.handleLogin}/>;
    }

    getPlan = (props) => {
       return this.props.isLoggedIn
           ? <Plan
               city = {props.location.state ? props.location.state.city : this.city} //?
               // getHistory={this.props.getHistory}
           />
           : <Redirect to="/login" />;
    }

    getCity = () => {
        return this.props.isLoggedIn ? <ChooseCity/> : <Redirect to="/login" />;
    }


 render() {
   return (
     <div className="main">
       <Switch>
         <Route exact path="/" render={this.getLogin}/>
         <Route path="/login" render={this.getLogin}/>
         <Route path="/register" component={Register}/>
           <Route path="/city" render={this.getCity}/>
         <Route path="/plan" render={this.getPlan}/>
           {/*<Route path="/plan" component={Plan}/>*/}
           <Route path="/test" component={Test}/>
       </Switch>
     </div>
   );
 }
}
