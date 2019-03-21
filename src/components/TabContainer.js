import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import Login from './Login'
import Register from './Register'

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

class LoginTabs extends React.Component {
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
        <AppBar position="static" color="default">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
        </AppBar>
        {value === 0 && <TabContainer><Login/></TabContainer>}
        {value === 1 && <TabContainer><Register/></TabContainer>}
      </div>
    );
  }
}

LoginTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginTabs);