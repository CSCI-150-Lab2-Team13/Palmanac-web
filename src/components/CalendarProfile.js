import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Text from 'react';
//import { firestore } from 'firebase';
import firebase from 'firebase/app';
import './CalendarProfileLook.css';

class CalendarProfile extends React.Component {
  state = {
    open: false,
    firstName: "",
    lastName: "",
    email: "",
    photoURL: "",
    user: firebase.auth().currentUser.displayName,
    errormessage: null,
  };

  componentWillMount = () => {
      this.setState({ open: true});

      const ref = firebase.firestore().collection('users').doc(this.state.user);
      ref.get().then(doc => {
        if (doc.exists) {
          let data = doc.data()
          this.setState({firstName: data.firstName, lastName: data.lastname, photoURL: data.photoURL, email: data.Email})
        }
        else { console.error("No such user!"); }
      })
      .catch((error)=>
      this.setState({errormessage:error}));
  };

  render() {
    return (
      <div>
        {this.state.errorMessage &&
            <Text style={{ color: 'red', textAlign: 'center', marginTop: 5 }}>
                {this.state.errorMessage}
            </Text>
        }
        <Dialog
          open={this.state.open}
          onClose={this.props.toggle}
          aria-labelledby="profile-dialog-title"
          aria-describedby="profile-dialog-description"
        >
          <DialogTitle id="profile-dialog-title">{"Profile: "}</DialogTitle>
          <DialogContent>
            <img src= {this.state.photoURL} />
            <br></br>
            <DialogContentText id="profile-dialog-firstname"> Name: {this.state.firstName} {this.state.lastName} </DialogContentText>
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