import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class CalendarProfile extends React.Component {
  state = {
    open: false,
  };

  /*
  componentWillRecieveProps(nextProps){
    this.setState({ open: true });
    alert("test");
  };
*/

  componentWillMount = () => {
      this.setState({ open: true});
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="profile-dialog-title"
          aria-describedby="profile-dialog-description"
        >
          <DialogTitle id="profile-dialog-title">{"Profile"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="profile-dialog-description">
              Profile Information will go here.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CalendarProfile;