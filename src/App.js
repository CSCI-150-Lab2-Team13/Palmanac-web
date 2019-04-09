import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './App.css';
import LoginTabs from './components/TabContainer'
import Home from './components/Home';
import fire from './firebase/Fire';



const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#00b2ff',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // error: will use the default color
  },
});
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
    }
  }
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({user});
      } else {
        this.setState({user: null});
      }
    });
  }
  
  componentDidMount(){
    this.authListener();
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
       {this.state.user ? <Home user={this.state.user.uid}/> : <LoginTabs />}
       
        </MuiThemeProvider >
    );
  }
}

export default App;
