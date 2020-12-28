import React, {useState} from 'react';
import {Auth, LeaderBoards, Message, SideNav} from "./Components"
import myGame from "./Games/myGame"
import { Route, Switch, BrowserRouter as Router } from "react-router-dom"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import * as TokenContext from './Context/TokenContext';


const theme = createMuiTheme({
  props:{
    MuiButtonBase: {
      
    }
  }
})

type myState = {
  token: string | null
}


class App extends React.Component<{}, myState>{
  constructor(props: {}){
    super(props)
    this.state = {
      token: localStorage.getItem("token")
    }
  }

  render(){

    return (
          <Router>
            <Switch>
            <Route path="/" component={SideNav}/>
            <Route path="/game" component={myGame} />
            <Route path="/login" component={Auth}/>
            <Route path="/logout" component={Auth} />
            <Route path="/leaderBoard" component={LeaderBoards}/>
            <Route path="/Message" component={() => <Message token={this.state.token}/>}/>
            </Switch>
          </Router>
  );
}
}

export default App;
