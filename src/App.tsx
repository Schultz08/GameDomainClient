import React, {useState} from 'react';
import {Auth, LeaderBoards} from "./Components/index"
import myGame from "./Games/myGame"
import { Route, Switch, BrowserRouter as Router } from "react-router-dom"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  props:{
    MuiButtonBase: {
      
    }
  }
})

class App extends React.Component{

  render(){

    return (
          <Router>
            <Switch>
            <Route path="/game" component={myGame} />
            <Route path="/login" component={Auth}/>
            <Route path="/logout" component={Auth} />
            <Route path="/leaderBoard" component={LeaderBoards}/>
            </Switch>
          </Router>
  );
}
}

export default App;
