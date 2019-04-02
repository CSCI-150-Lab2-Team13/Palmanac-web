import React,  { Fragment, useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Autorenew from '@material-ui/icons/Autorenew';
import AutorenewOutlined from '@material-ui/icons/AutorenewOutlined';
import moment from 'moment';
import {RRule} from 'rrule';

function pront(e) {
    console.log(e.target.value);
}
function recurRule(freq, day) {
    if (freq == "Custom"){
        console.log(freq);
    }
    else if (freq !== 'none') {
        const rule = new RRule({
            freq: freq,
            dtstart: new Date(moment(day).utc()),
            count: 5
        });
        
        rule.all().forEach(day => {
            console.log(moment(day).format());
        });
    };
}

function RecurrenceMenu(props) {
    const dayOfWeek = moment(props.day).format("dddd");
    const dayOfMonth = moment(props.day).format("MMMM D");
    const [recurrence, setRecurrence] = useState('none');
    recurRule(recurrence, props.day);


    return(
        <Fragment>
            <Checkbox
                icon={<AutorenewOutlined />} 
                checkedIcon={<Autorenew/>} 
                onChange={props.handleCheck('recurring')}
            />
            <FormControl variant="filled">
                <InputLabel >Recurring</InputLabel> 
                    <Select
                        value={recurrence}
                        onChange={e=>setRecurrence(e.target.value)}
                        disabled={!props.recurring}
                        autoWidth
                        input={<Input/>}
                    >
                        <MenuItem value={RRule.DAILY}>Daily</MenuItem>
                        <MenuItem value={RRule.WEEKLY}>Weekly on {dayOfWeek}</MenuItem>
                        <MenuItem value={RRule.YEARLY}>Annually on {dayOfMonth}</MenuItem>
                        <MenuItem value="Custom"><em>Custom</em></MenuItem>
                    </Select>
            </FormControl>   
        </Fragment>
    );
}

export {RecurrenceMenu};