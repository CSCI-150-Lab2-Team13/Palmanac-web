import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import moment from 'moment';
import firebaseAPI from '../firebase/firestoreAPI';
import fire from '../firebase/Fire';
import EventTabs from './EventTabs';


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
    start: '',
    end: '',
    desc: '',
    rrule: '',
    recurring: false
  };
  
  componentDidMount() {
    this.setState({
      ...this.state,
      start: moment(this.props.events.start).format(),
      end: moment(this.props.events.end).format()
    });
  };

  setStartDate = date => {
    if(moment(date.format()).isAfter(this.state.end)){
      this.setState({
        ...this.state,
        start: date.format(),
        end: date.format()
      })
    } else {
      this.setState({
          ...this.state,
          start: date.format()
        })
    }
  };

  setEndDate = date => {
    
    if(moment(date.format()).isBefore(this.state.start)){
      this.setState({
        ...this.state,
        start: date.format(),
        end: date.format()
      });
    } else {
      this.setState({
        ...this.state,
        end: date.format()
        })
    }
  };

  setRrule = rrule => {
    this.setState({
      ...this.state,
      rrule: rrule
    })
  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value})
}
  
  handleCheck = name => e => {
    this.setState({ [name]: e.target.checked});
  } 

  saveEvent(e) {
    console.log(this.state);
    firebaseAPI.addEvent(fire.auth().currentUser.uid, this.state);
    this.props.update()
    this.props.toggle(e)
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
          start={this.state.start}
          end={this.state.end}
          title={this.state.title}
          setEndDate={this.setEndDate}
          handleCheck={this.handleCheck}
          recurring={this.state.recurring}
          setRrule={this.setRrule}

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