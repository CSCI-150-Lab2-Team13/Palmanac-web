import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import moment from 'moment';
import firebaseAPI from '../firebase/firestoreAPI';
import fire from '../firebase/Fire';


import EventTabs from './EventTabs';
import Select from '@material-ui/core/Select';

class CalendarEntry extends React.Component {
  constructor(props){
    super(props);
    this.setDate = this.setStartDate.bind(this);
    this.setDate = this.setEndDate.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  state = {
    title: '',
    event: {},
    recurring: false
  };
  
  componentDidMount() {
    this.setState({
      event: {
        ...this.props.events,
        start: moment(this.props.events.start).format(),
        end: moment(this.props.events.end).format()
      }
    });
  };

  setStartDate = date => {
    if(moment(date.format()).isAfter(this.state.event.end)){
      this.setState({
        event: {
          ...this.state.event,
          start: date.format(),
          end: date.format()
        }
      })
    } else {
      this.setState({
        event: {
          ...this.state.event,
          start: date.format()
        }
        })
    }
  };

  setEndDate = date => {
    
    if(moment(date.format()).isBefore(this.state.event.start)){
      this.setState({
        event: {
          ...this.state.event,
          start: date.format(),
          end: date.format()
        }
      })
    } else {
      this.setState({
        event: {
          ...this.state.event,
          end: date.format()
        }
        })
    }
  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value})
}
  
  handleCheck = name => e => {
    this.setState({ [name]: e.target.checked});
  } 

  saveEvent() {
    console.log(fire.auth().currentUser.uid);
    //firebaseAPI.addEvent(fire.auth().currentUser.uid, this.state);
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.toggle}
          aria-labelledby="form-dialog-title"
          fullWidth={true}
        >
        
        <EventTabs 
          handleChange={this.handleChange}
          setStartDate={this.setStartDate}
          event={this.state.event}
          setEndDate={this.setEndDate}
          handleCheck={this.handleCheck}
          recurring={this.state.recurring}

        />
        
          <DialogActions>
            <Button onClick={this.props.toggle} color="primary">
              Cancel
            </Button>
            <Button onClick={this.saveEvent} color="primary">
              Save Event
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CalendarEntry;