    
import React, { Component } from 'react';
import fire from '../firebase/Fire';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


import Button from '@material-ui/core/Button';
//import TextField from '@material-ui/core/TextField';
//import Input from '@material-ui/core/Input';
//import InputLabel from '@material-ui/core/InputLabel';
//import FormControl from '@material-ui/core/FormControl';
//import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        showPassword: false,
        submitted: false,
      };
    }

    login = e => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(u => {
                console.log(u);
            })
            .catch(error => {
                console.log(error);
                  if ((error.code == "auth/wrong-password") || (error.code == "auth/user-not-found") || (error.code == "auth/too-many-requests")) {  
                    ValidatorForm.addValidationRule('isSubmitProper', (value) => {
                      return false;
                  });
                }
                  else {
                    ValidatorForm.addValidationRule('isSubmitProper', (value) => {
                      return true;
                  });
                }
            });
      }

    handleChange = input => e =>  {
      this.setState({ [input]: e.target.value})
      ValidatorForm.addValidationRule('isSubmitProper', (value) => {
        return true;
    });
    }

    handleSubmit = e => {
      this.setState({ submitted: true }, () => {
        this.login(e);
        this.setState({ submitted: false });
    });
    }

    handleClickShowPassword = () => {
      this.setState(state => ({ showPassword: !state.showPassword }));
    }
    
      render() {
        const { email, password } = this.state;
        return (
            <div>
            <ValidatorForm ref="form">
                          <TextValidator
                          label="Email"
                          onChange={this.handleChange('email')}
                          name="email"
                          value={email}
                          validators={['required', 'isEmail']}
                          errorMessages={['Email cannot be empty', 'Email is not valid']}
                      />
                      <br />
                      <TextValidator 
                          label="Password"
                          onChange={this.handleChange('password')}
                          type={this.state.showPassword ? 'text' : 'password'}
                          name="password"
                          value={password}
                          validators={['required','isSubmitProper']}
                          errorMessages={['Password cannot be empty','Invalid Email or Password']}
                      />
                      <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                       >
                          {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                      <br />
                      <Button id='logins' style = {style} variant="contained" type="submit" onClick={this.handleSubmit}> 
                        Login
                      </Button>
                    </ValidatorForm>
            <br/>
            </div>  
        );
      }
    }



const style = {
    margin: 15,
};
export default Login;