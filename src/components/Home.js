import React, { Component } from 'react';
import fire from '../firebase/Fire';
import ButtonAppBar from './ButtonAppBar'
import Calendar from './Calendar';

class Home extends Component {
    constructor(props){
        super(props);
    }

    logout() {
        fire.auth().signOut();
    } 
    render() {
        return (
            <div>
                <ButtonAppBar logout={this.logout}/>
                <Calendar user={this.props.user}/>
            </div>
        )
    }
}
export default Home;