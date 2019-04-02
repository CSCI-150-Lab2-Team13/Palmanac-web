import React,  { Fragment } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import {EventDTPicker, ToDoDTPicker} from './CalendarDateTimePicker';
import TextField from '@material-ui/core/TextField';



function EventForm(props) {
    return (
        <Fragment>
        <Paper>
        <DialogTitle id="form-dialog-title">Add Event</DialogTitle>

          <DialogContent>
            <Paper elevation={0}>
            <TextField
              fullWidth={true}
              autoFocus
              margin="dense"
              id="name"
              label="Title"
              multiline={true}
              onChange={props.handleChange('title')}
              /></Paper> <br/><br/>

                <EventDTPicker 
                  event={props.event}
                  setStartDate={props.setStartDate}
                  setEndDate={props.setEndDate}
                  handleCheck={props.handleCheck}
                  recurring={props.recurring}
                  />
                
          </DialogContent></Paper>
          </Fragment>
    );
  }

function ToDoForm(props) {
return (
    <Fragment>
      <Paper>
    <DialogTitle id="form-dialog-title">Add To-Do</DialogTitle>

        <DialogContent>
        <Paper elevation={0}>
        <TextField
            fullWidth={true}
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            multiline={true}
            onChange={props.handleChange('title')}
            /></Paper> <br/><br/>

              <ToDoDTPicker
                  event={props.event}
                  setStartDate={props.setStartDate}
                  handleCheck={props.handleCheck}
                  recurring={props.recurring}
                  />
        </DialogContent></Paper>
        </Fragment>
);
}

export { EventForm, ToDoForm};