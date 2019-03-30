import React, { Fragment } from 'react';
import { DatePicker } from "material-ui-pickers";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import moment from 'moment';
import firebaseAPI from '../firebase/firestoreAPI';
import fire from '../firebase/Fire';

class EventForm extends React.Component {
  constructor(props){
    super(props);
    this.setDate = this.setStartDate.bind(this);
    this.setDate = this.setEndDate.bind(this);
    this.saveEvent = this.saveEvent.bind(this);
  }

  state = {
    title: '',
    event: {}
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

  saveEvent() {
    console.log(fire.auth().currentUser.uid);
    firebaseAPI.addEvent(fire.auth().currentUser.uid, this.state);
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
          <DialogTitle id="form-dialog-title">Add Event</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Title"
              multiline={true}
              onChange={this.handleChange('title')}
              />

            <MuiPickersUtilsProvider utils={MomentUtils}>
              <Fragment>
                <div className="picker">
                <DatePicker
                label="Start Date"
                value={this.state.event.start}
                onChange={this.setStartDate}
                animateYearScrolling
                />
                </div>
              </Fragment>
              <Fragment>
                <div className="picker">
                <DatePicker
                label="End Date"
                value={this.state.event.end}
                onChange={this.setEndDate}
                animateYearScrolling
                />
                </div>
              </Fragment>
            </MuiPickersUtilsProvider> 
          </DialogContent>
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

/* function EventForm() {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState();

    return (
    <Fragment>
      <div className="picker">
        <DatePicker
          label="Basic example"
          value={date}
          onChange={setDate}
          animateYearScrolling
        />
      </div>
      </Fragment>
    );
} */

export default EventForm;