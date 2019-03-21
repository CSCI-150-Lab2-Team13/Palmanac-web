import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import fire from '../firebase/Fire';

class Login extends Component {
    constructor(props) {
      super(props);
      //this.login = this.login.bind(this);
      //this.handleChange = this.handleChange.bind(this);
      //this.signup = this.signup.bind(this);
      this.state = {
        email: '',
        password: '',
        showPassword: false
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
            });
    }
    handleChange = input => e => {
        this.setState({ [input]: e.target.value})
    }
    handleClickShowPassword = () => {
      this.setState(state => ({ showPassword: !state.showPassword }));
      };
      render() {
        return (
          <div>
              <div>
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