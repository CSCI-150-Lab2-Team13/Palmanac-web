import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import IconButton from '@material-ui/core/IconButton';
//import Input from '@material-ui/core/Input';
//import InputLabel from '@material-ui/core/InputLabel';
//import FormControl from '@material-ui/core/FormControl';
//import InputAdornment from '@material-ui/core/InputAdornment';
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
          username: '',
          email: '',
          emailcheck: '',
          password: '',
          reppassword:'',
          showPassword: false,
          submitted: false
        };
      }

    register = e => {
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(userCredential => {
                return userCredential.user
            })
            .then(user => {
                user.updateProfile({
                    displayName: this.state.username})
                    .then(() => {console.log(' set display name')})
                    .catch((error) => {console.log('error')});
                const newUser = {
                    id: user.uid,
                    email: user.email,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    Username: this.state.username,
                    photoUrl: ""
                };
                firebaseAPI.addUser(newUser);
            })
            .catch(error => {
                console.log(error);
                if(error.code == "auth/email-already-in-use"){this.setState({emailcheck: this.state.email})}
                else this.setState({emailcheck: ''});
            });

    }

    componentWillMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value != this.state.password) {return false;}
            return true;
        });
        ValidatorForm.addValidationRule('isPasswordLength', (value) => {
            if (value.length < 6) {return false;}
            return true;
        });
        ValidatorForm.addValidationRule('isEmailTaken', (value) => {
            if (value == this.state.emailcheck) {return false;}
            return true;
        });
    }

    handleChange = input => e => {
        this.setState({ [input]: e.target.value})
        this.setState({emailcheck: true});
    }

    handleSubmit = e => {
        this.setState({ submitted: true }, () => {
        if(this.state.password == this.state.reppassword){this.register(e)};
        this.setState({ submitted: false });
        });
    }

    handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
    };

    render() {
        const { email, password, username, reppassword} = this.state;
        return (
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
            <ValidatorForm ref="form">
            <TextValidator
                    label="User name"
                    onChange={this.handleChange('username')}
                    name="username"
                    value={username}
                    validators={['required']}
                    errorMessages={['User name is required']}
                />
                <br/>
                <TextValidator
                    type="email"
                    label="Email"
                    onChange={this.handleChange('email')}
                    name="email"
                    value={email}
                    validators={['required', 'isEmail', 'isEmailTaken']}
                    errorMessages={['Email is required', 'email is not valid', 'This Email has been taken, choose a diffrent email']}
                />
                <br/>
                <TextValidator
                    label="Password"
                    onChange={this.handleChange('password')}
                    type={this.state.showPassword ? 'text' : 'password'}
                    name="password"
                    validators={['required', 'isPasswordLength']}
                    errorMessages={['Password is required', 'Password is not long enough']}
                    value={password}
                />
                <IconButton
                    aria-label="Toggle password visibility"
                    onClick={this.handleClickShowPassword}
                    >
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
                <br />
                <TextValidator
                    label="Repeat Password"
                    onChange={this.handleChange('reppassword')}
                    type={this.state.showPassword ? 'text' : 'password'}
                    name="reppassword"
                    validators={['required', 'isPasswordMatch']}
                    errorMessages={['Repeat of password is required', 'Password mismatch']}
                    value={reppassword}
                />
                <br />
                <Button id='registers' style = {style} variant="contained" type="submit" onClick={this.handleSubmit}> 
                        Register
                </Button>
            </ValidatorForm>
        </div>
        )
    }; 
}
const style = {
    margin: 15,
};

export default Register;
