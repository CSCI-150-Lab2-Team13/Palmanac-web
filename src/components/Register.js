import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import fire from '../firebase/Fire';
import firebaseAPI from '../firebase/firestoreAPI';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          showPassword: false
        };
      }

    register =  e => {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(userCredential => {
                return userCredential.user
            })
            .then(user => {
                const newUser = {
                    id: user.uid,
                    email: user.email,
                    gender: "",
                    age: 0,
                    photoUrl: "",
                    isNewUser: true
                };
                firebaseAPI.addUser(newUser);

            })
            .catch(error => {
                console.log(error);
            });
    }
    handleChange = input => e => {
        this.setState({ [input]: e.target.value})
    }

    handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
    };
    render() {
        const { classes } = this.props;
        return (
            <div>
                <div>
                    <TextField
                    label="First Name"
                    onChange = {this.handleChange('firstName')}
                />
                <br/>
                <TextField
                    label="Last Name"
                    onChange = {this.handleChange('lastName')}
                />
                <br/>
                <TextField
                    type="email"
                    label="Email"
                    onChange = {this.handleChange('email')}
                />
                <br/>
            <FormControl >
              <InputLabel htmlFor="adornment-password">Password</InputLabel>
              <Input
                id="adornment-password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.password}
                onChange={this.handleChange('password')}
                endAdornment={
                    <InputAdornment position="end">
                    <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                    >
                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                    </InputAdornment>
                }
                />
        </FormControl>
                <br/>
                <Button label="Submit" variant='contained' style={style} onClick={this.register}>
                    Register
                </Button>
            </div>
           
        </div>
        )
    }; 
}
const style = {
    margin: 15,
};

export default Register;