import React, { Fragment } from 'react';
import { DatePicker } from "material-ui-pickers";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';

class EventForm extends React.Component {
  constructor(props){
    super(props);
    this.setDate = this.setDate.bind(this);
  }
  state = {
    events: {}
  };
  componentDidMount() {
    this.setState({
      events: this.props.events,
    });
  };

  setDate = date => {
      this.setState({
        events: {
          ...this.state.events,
          start: date._d,
          end: date._d
        }
      })
  };

  render() {
    const sd = this.state.events;
    console.log(sd.start);
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.toggle}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Event</DialogTitle>
          <DialogContent>
            <DialogContentText>
             {JSON.stringify(this.state.events)} 
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Description"
              fullWidth
            />
          </DialogContent>
          <MuiPickersUtilsProvider utils={MomentUtils}>
          <Fragment>
            <div className="picker">
              <DatePicker
              label="Start Date"
              value={sd.start}
              onChange={this.setDate}
              animateYearScrolling
              />
            </div>
          </Fragment>
          </MuiPickersUtilsProvider>
          <DialogActions>
            <Button onClick={this.props.toggle} color="primary">
              Cancel
            </Button>
            <Button onClick={this.props.toggle} color="primary">
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