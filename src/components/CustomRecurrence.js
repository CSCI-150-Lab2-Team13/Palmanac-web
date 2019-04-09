import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {RRule} from 'rrule';
import moment from 'moment';

// Icons for weekday buttons
import AlphaMcircle from 'mdi-material-ui/AlphaMcircle';
import AlphaMcircleOutline from 'mdi-material-ui/AlphaMcircleOutline';
import AlphaTcircle from 'mdi-material-ui/AlphaTcircle';
import AlphaTcircleOutline from 'mdi-material-ui/AlphaTcircleOutline';
import AlphaWcircle from 'mdi-material-ui/AlphaWcircle';
import AlphaWcircleOutline from 'mdi-material-ui/AlphaWcircleOutline';
import AlphaFcircle from 'mdi-material-ui/AlphaFcircle';
import AlphaFcircleOutline from 'mdi-material-ui/AlphaFcircleOutline';
import AlphaScircle from 'mdi-material-ui/AlphaScircle';
import AlphaScircleOutline from 'mdi-material-ui/AlphaScircleOutline';
import { Day } from 'material-ui-pickers';
import { weekdaysMin } from 'moment';

export default class CustomRecurrence extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: this.props.open,
      frequency: RRule.DAILY,
      interval: 1,
      occurences: '',
      wkdays: [],
      endsOn: '',
      day: this.props.start

    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  setFrequency = (freq) => {
    if(freq!== RRule.WEEKLY){
      this.setState({
        ...this.state,
        wkdays: [],
        frequency: freq
      });
    } else {
      this.setState({
        ...this.state,
        frequency: freq
      });
    }
  };

  handleChange = input => e => {
    this.setState({
      ...this.state, 
      [input]: e.target.value
    })
};

  setDayOfWeek = (day)  => {
    const wkdays = this.state.wkdays;
    
    if (wkdays.includes(day)){
      let index = wkdays.indexOf(day);
      wkdays.splice(index, 1);
      this.setState({
        ...this.state,
        wkdays: wkdays
      })
    } else {
      wkdays.push(day);
    this.setState({
      ...this.state,
      wkdays: wkdays
    })  
  }
  };

  handleDone = () => {
    const freq = this.state.frequency;
    const interval = this.state.interval;
    const occurences = this.state.occurences;
    const wkdays = this.state.wkdays;

    const rule = new RRule({
      freq: freq,
      interval: interval,
      byweekday: wkdays,
      dtstart: new Date(moment(this.state.day).utc()),
      count: occurences
  });
  this.props.setRrule(rule.toString());
  };


  render() {
    
    const divStyle = {
      paddingTop: 1,
      paddingBottom: 1,
    };

    const frequency = this.state.frequency;
    const occurences = this.state.occurences;
    const interval = this.state.interval;
    const endsOn = this.state.endsOn;
    const plural = (interval>1) ? true : false;
    return (
      <div >
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          style = {{ alignItems:'center',justifyContent:'center'}}
        >
          <DialogTitle id="form-dialog-title">Custom Recurrence</DialogTitle>
          
            <DialogContent>
            <DialogContentText>
              Repeat every
            </DialogContentText>
            <div>
            <TextField
                id="outlined-number"
                style = {{width: 30}}
                value={interval}
                onChange={this.handleChange('interval')}
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                margin="none"
                inputProps={{ min: "1" }}
              />    
            <Select
                value={frequency}
                onChange={e=>this.setFrequency(e.target.value)}
                autoWidth={true}
                input={<Input/>}
              >
                <MenuItem value={RRule.DAILY}>{plural? 'days' : 'day'}</MenuItem>
                <MenuItem value={RRule.WEEKLY}>{plural? 'weeks' : 'week'}</MenuItem>
                <MenuItem value={RRule.MONTHLY}>{plural? 'months' : 'month'}</MenuItem>
                <MenuItem value={RRule.YEARLY}>{plural? 'years' : 'year'}</MenuItem>
            </Select></div>
          </DialogContent>
          
          {frequency==RRule.DAILY ? <div></div> : null}
          {frequency==RRule.WEEKLY ? 
            <div style={divStyle}>
            <DialogContent style={divStyle}>
            <DialogContentText>
              Repeat on
            </DialogContentText>
            </DialogContent>
              <Checkbox
                icon={<AlphaScircleOutline/>} 
                checkedIcon={<AlphaScircle/>} 
                onChange={() => {this.setDayOfWeek(RRule.SU)}}
              />
              <Checkbox
                icon={<AlphaMcircleOutline/>} 
                checkedIcon={<AlphaMcircle/>} 
                onChange={() => {this.setDayOfWeek(RRule.MO)}}
              />
              <Checkbox
                icon={<AlphaTcircleOutline/>} 
                checkedIcon={<AlphaTcircle/>} 
                onChange={() => {this.setDayOfWeek(RRule.TU)}}
              />
              <Checkbox
                icon={<AlphaWcircleOutline/>} 
                checkedIcon={<AlphaWcircle/>} 
                onChange={() => {this.setDayOfWeek(RRule.WE)}}
              />
              <Checkbox
                icon={<AlphaTcircleOutline/>} 
                checkedIcon={<AlphaTcircle/>} 
                onChange={() => {this.setDayOfWeek(RRule.TH)}}
                />
              <Checkbox
                icon={<AlphaFcircleOutline/>} 
                checkedIcon={<AlphaFcircle/>} 
                onChange={() => {this.setDayOfWeek(RRule.FR)}}
              />
              <Checkbox
                icon={<AlphaScircleOutline/>} 
                checkedIcon={<AlphaScircle/>} 
                onChange={() => {this.setDayOfWeek(RRule.SA)}}
              />
               </div> : null}
           
            {frequency==RRule.MONTHLY ?  <div></div> : null}
            {frequency==RRule.YEARLY ? <div></div> : null}
            <DialogContent style={divStyle}>
              <DialogContentText>
                Ends on
              </DialogContentText>
              </DialogContent>
            <Grid container >
              <Grid item lg={2}>
                <Grid container>
                  <Grid style={{paddingTop: 0}} item id={1}>
                    <DialogContent style={{paddingTop: 0}}>     
                      <FormControl >
                        <RadioGroup
                          name="gender2"
                          value={endsOn}
                          onChange={this.handleChange('endsOn')}
                        >
                          <FormControlLabel
                            value="Never"
                            control={<Radio color="primary" />}
                            label="Never"
                          />
                          <FormControlLabel
                            value="On"
                            control={<Radio color="primary" />}
                            label="On"
                          />
                          <FormControlLabel
                            value="After"
                            control={<Radio color="primary" />}
                            label="After"
                          />
                        </RadioGroup>
                      </FormControl>
                    </DialogContent>
                </Grid>
                </Grid>
            </Grid>
         </Grid>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDone} color="primary">
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}