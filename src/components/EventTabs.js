import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {EventForm, ToDoForm} from './CalendarForm';


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class EventTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>

          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Event" />
            <Tab label="ToDo/Reminder" />
          </Tabs>

        {value === 0 &&
            <TabContainer>
                <EventForm
                  start={this.props.start}
                  end={this.props.end}
                  title={this.props.title}
                  setStartDate={this.props.setStartDate}
                  setEndDate={this.props.setEndDate}
                  handleChange={this.props.handleChange}
                  handleCheck={this.props.handleCheck}
                  recurring={this.props.recurring}
                  rrule={this.props.rrule}
                  setRrule={this.props.setRrule}
                />
            </TabContainer>}
        {value === 1 &&
             <TabContainer>
                 <ToDoForm
                    setStartDate={this.props.setStartDate}
                    start={this.props.start}
                    end={this.props.end}
                    handleChange={this.props.handleChange}
                    handleCheck={this.props.handleCheck}
                    recurring={this.props.recurring}
                    rrule={this.props.rrule}
                    setRrule={this.props.setRrule}
                />
            </TabContainer>}
      </div>
    );
  }
}

EventTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventTabs);