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
    firstname: "Firstname here",
    lastname: "Lastname here",
    email: "Test@email.com",
  };

  componentWillMount = () => {
      this.setState({ open: true});
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.props.toggle}
          aria-labelledby="profile-dialog-title"
          aria-describedby="profile-dialog-description"
        >
          <DialogTitle id="profile-dialog-title">{"Profile"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="profile-dialog-firstname"> First name: {this.state.firstname} </DialogContentText>
            <br></br>
            <DialogContentText id="profile-dialog-lastname"> Last name: {this.state.lastname} </DialogContentText>
            <br></br>
            <DialogContentText id="profile-dialog-email"> Email: {this.state.email} </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.toggle} color="primary" autoFocus> Close </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CalendarProfile;