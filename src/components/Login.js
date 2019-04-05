    
import React, { Component } from 'react';
import fire from '../firebase/Fire';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';

class Login extends Component {
    constructor(props) {
      super(props);
      //this.login = this.login.bind(this);
      //this.handleChange = this.handleChange.bind(this);
      //this.signup = this.signup.bind(this);
      this.state = {
        email: '',
        password: '',
        showPassword: false,
        submitted: false
      };
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    login = e => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(u => {
                console.log(u);
            })
            .catch(error => {
                console.log(error);
                alert(console.log(error));
            });
    }

    handleSubmit = input => e =>  {
      this.setState({ [input]: e.target.value})
      this.setState({ submitted: true }, () => {
          this.setState({ submitted: false });
      });
  }

    handleClickShowPassword = () => {
      this.setState(state => ({ showPassword: !state.showPassword }));
    };

      render() {
        const { email, password, submitted } = this.state
        return (
          <div>
            <div>
            <ValidatorForm ref="form">
                          <TextValidator
                          label="Email"
                          onChange={this.handleSubmit('email')}
                          name="email"
                          value={email}
                          validators={['required', 'isEmail']}
                          errorMessages={['this field is required', 'email is not valid']}
                      />
                      <br />
                      <TextValidator 
                          label="Password"
                          onChange={this.handleSubmit('password')}
                          type={this.state.showPassword ? 'text' : 'password'}
                          name="password"
                          value={password}
                          validators={['required']}
                          errorMessages={['this field is required']}
                      />
                      <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                       >
                          {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                      <br />

                      <Button id='logins' style = {style} variant="contained" type="submit" disabled={submitted}> 
                        { (submitted && 'Logging in') || (!submitted && 'Login') }
                      </Button>
                    </ValidatorForm>
            <br/>
            <Button label="Submit" variant='contained' style={style} onClick={this.login}>
              Login
            </Button>
            </div>  
            </div>
        );
      }
    }


const style = {
    margin: 15,
};
export default Login;
