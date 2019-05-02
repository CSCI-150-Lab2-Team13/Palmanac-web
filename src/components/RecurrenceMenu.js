import React,  { Fragment, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Autorenew from '@material-ui/icons/Autorenew';
import AutorenewOutlined from '@material-ui/icons/AutorenewOutlined';
import moment from 'moment';
import {RRule} from 'rrule';
import CustomRecurrence from './CustomRecurrence';

function RecurrenceMenu(props) {
    let origFreq = props.rrule ? RRule.fromString(props.rrule).origOptions.freq : ""
    const dayOfWeek = moment(props.day).format("dddd");
    const dayOfMonth = moment(props.day).format("MMMM D");
    const startDay = moment(props.day).format();
    const [recurrence, setRecurrence] = useState(origFreq);
    const [occurences, setOccurences] = useState(1);
    const [customRecurr, setCustomRecurr] = useState(false);

    const recurRule = (freq, occur) => {
        setRecurrence(freq);
        setOccurences(occur)

        if(freq == 'Custom'){
            setCustomRecurr(true);
        } else if (freq !== '') {
            const rule = new RRule({
                freq: freq,
                dtstart: new Date(moment(props.day).utc()),
                count: occur
            });
            console.log(rule.toString());
            props.setRrule(rule.toString());
        }    
        
    }

    return(
        <Fragment>
            <Checkbox
                checked={props.recurring}
                icon={<AutorenewOutlined />} 
                checkedIcon={<Autorenew/>} 
                onChange={props.handleCheck('recurring')}
                style={{paddingLeft: 0}}
            />
            <FormControl variant="filled">
                <InputLabel >Recurring</InputLabel> 
                    <Select
                        value={recurrence}
                        onChange={e=>recurRule(e.target.value, occurences)}
                        disabled={!props.recurring}
                        style = {{width: 200}}
                        autoWidth={true}
                        input={<Input/>}
                    >
                        <MenuItem value={RRule.DAILY}>Daily</MenuItem>
                        <MenuItem value={RRule.WEEKLY}>Weekly on {dayOfWeek}</MenuItem>
                        <MenuItem value={RRule.YEARLY}>Annually on {dayOfMonth}</MenuItem>
                        <MenuItem value="Custom"><em>Custom</em></MenuItem>
                    </Select>
            </FormControl>
            <TextField
            disabled={!props.recurring}
                id="outlined-number"
                style = {{width: 50}}
                label="Recurrences"
                value={occurences}
                onChange={e => recurRule(recurrence, e.target.value)}
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{ min: 1 }}
                margin="none"
                
        />
        {customRecurr ? <CustomRecurrence open={customRecurr} start={startDay} end={props.end} setRrule={props.setRrule} close={setCustomRecurr}/>: null}   
        </Fragment>
    );
}

export {RecurrenceMenu};