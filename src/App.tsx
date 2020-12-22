import React, {useState} from 'react';
import {Auth, LeaderBoards} from "./Components/index"
import myGame from "./Games/myGame"
import { Route, Switch, BrowserRouter as Router } from "react-router-dom"








class App extends React.Component{

  render(){

    return (
      <div className="App">
          <Router>
            <Switch>
            <Route path="/game" component={myGame} />
            <Route path="/login" component={Auth}/>
            <Route path="/logout" component={Auth} />
            <Route path="/leaderBoard" component={LeaderBoards}/>
            </Switch>
          </Router>
    </div>
  );
}
}

export default App;
