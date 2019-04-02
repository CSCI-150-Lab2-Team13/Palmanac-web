import React,  { Fragment } from 'react';
import { InlineDatePicker } from "material-ui-pickers";
import { InlineTimePicker } from "material-ui-pickers";
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';

import {RecurrenceMenu} from './RecurrenceMenu';
import DateRange from '@material-ui/icons/DateRange';
import Paper from '@material-ui/core/Paper';


function EventDTPicker(props) {
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Fragment>
            <div className="picker">
            <DateRange/>
            <InlineDatePicker
              variant='outlined'
              label="Start Date"
              value={props.event.start}
              onChange={props.setStartDate}
              animateYearScrolling
            />
            <InlineTimePicker
              variant='outlined'
              label="Start Time"
              value={props.event.start}
              onChange={props.setStartDate} 
              />
            </div>

        </Fragment>
              <br/>
              <Fragment>
                <div className="picker">
                <DateRange/>
                <InlineDatePicker
                  variant='outlined'
                  label="End Date"
                  value={props.event.end}
                  onChange={props.setEndDate}
                  animateYearScrolling
                />
                <InlineTimePicker 
                  variant='outlined' 
                  label="End time" 
                  value={props.event.end} 
                  onChange={props.setEndDate} 
                />
                </div>

            <RecurrenceMenu 
              handleCheck={props.handleCheck}
              recurring={props.recurring}
              day={props.event.start}
              />

              </Fragment>

        </MuiPickersUtilsProvider>
    );
  }

function ToDoDTPicker(props) {
  return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
          <Fragment>
              <div className="picker">
              <DateRange/>
              <InlineDatePicker
                variant='outlined'
                label="Start Date"
                value={props.event.start}
                onChange={props.setStartDate}
                animateYearScrolling
              />
              <InlineTimePicker 
                variant='outlined'
                label="Start Time"
                value={props.event.start}
                onChange={props.setStartDate}
              />
              </div>
              
              <RecurrenceMenu 
              handleCheck={props.handleCheck}
              recurring={props.recurring}
              day={props.event.start}
              />
            </Fragment>

      </MuiPickersUtilsProvider>
  );
}

export  {EventDTPicker, ToDoDTPicker};
  