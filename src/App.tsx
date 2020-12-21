import React from 'react';
import {Auth} from "./Components/index"
import { Route, BrowserRouter as Router } from "react-router-dom"




const App: React.FC = () => {

  // let token = localStorage.getitem("sessionToken")

  return (
    <div className="App">
          <Router>
            <Route path="/login" component={Auth} />
            <Route path="/logout" component={Auth} />
          </Router>
    </div>
  );
}

export default App;
