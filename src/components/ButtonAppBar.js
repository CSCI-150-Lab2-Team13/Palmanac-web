import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';

import CalendarProfile from './CalendarProfile';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class ButtonAppBar extends React.Component {
  state = {
    anchorEl: null,
    isProfileModalOpen: false,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  toggleProfileModal = () => {
    this.setState({ anchorEl: null });
      this.setState({ isProfileModalOpen: !this.state.isProfileModalOpen });
  };

  render(){
    const {  anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
    <div >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" >
            Palmanac
          </Typography>
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.toggleProfileModal}>Profile</MenuItem>
                  <MenuItem onClick={this.props.logout}>Logout</MenuItem>
                </Menu>

                {this.state.isProfileModalOpen ? <CalendarProfile open={this.state.isProfileModalOpen} toggle={this.toggleProfileModal}/>: null}
              </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);