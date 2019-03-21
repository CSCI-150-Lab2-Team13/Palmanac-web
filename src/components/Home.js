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
                <Calendar/>
{/*                 <React.Fragment>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <EventForm />
                    </MuiPickersUtilsProvider>
                </React.Fragment>
                <h1>hello  {this.props.user.email}</h1> */}

            </div>
        )
    }
}
export default Home;