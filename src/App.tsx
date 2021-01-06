import React from 'react';
import { Auth, LeaderBoards, Message, SideNav } from "./Components"
import myGame from "./Games/myGame"
import { Route, Switch, BrowserRouter as Router } from "react-router-dom"
import { withStyles, WithStyles, makeStyles, createStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core/styles';
import { Grid } from "@material-ui/core"
import Video from "./assets/GameVid.mp4"

const styles = (theme:Theme) => createStyles ({
  root: {
    flexGrow: 1,
    marginTop: "5rem",
    display: "flex",
  },
  sidenav: {
    padding: theme.spacing(2),
    textAlign: 'center',
    border: "3px solid black",
    margin: "1rem",
    height: "100%",
    minWidth: "240px",
    maxWidth: "277px",
    maxHeight: "800px",
  },
  center: {
    padding: theme.spacing(2),
    textAlign: 'center',
    border: "3px solid black",
    margin: "1rem",
    height: "100%",
    minWidth: "240px",
    maxHeight: "800px",
  },
  leaderboard: {
    padding: theme.spacing(2),
    textAlign: 'center',
    border: "3px solid black",
    margin: "1rem",
    height: "100%",
    minWidth: "240px",
    maxWidth: "277px",
    maxHeight: "800px",
    overflow: "auto"
  },
  backgroundVideo: {
    position: "absolute",
    left: 0,
    top: 0
  },
  title: {
    position: "absolute",
    color: "white",
    zIndex: 100,
    marginLeft: "5rem",
    fontSize: "5rem"
  }
});

type myState = {
  token: string | null
}

type myProps = {
  classes: any;
}


class App extends React.Component<myProps, myState>{
  constructor(props: myProps) {
    super(props)
    this.state = {
      token: null
    }
  }

  componentDidMount(){
    this.setState({token: localStorage.getItem("token")})
  }

  componentDidUpdate(){
    if(this.state.token !== localStorage.getItem("token")){
    this.setState({token: localStorage.getItem("token")})
    }
  }

  updateToken = (token: string) =>{
    if(this.state.token !== token){
      this.setState({token: token})
      }
  }

  clearToken = () => {
    this.setState({token: ""})
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container justify="center" direction="row" alignItems="center" >
          <Grid container item xs className={classes.sidenav}>
            <SideNav token={this.state.token} clearToken={this.clearToken} />
          </Grid>
          <Grid container item xs className={classes.center}>
            <Router>
              <Switch>
                <Route path="/" exact>
                  <h1 className={classes.title}>GameDomain</h1>
                  <video autoPlay loop muted>
                    <source src={Video} type='video/mp4' />
                  </video>
                </Route>
                <Route path="/game" component={myGame} />
                <Route path="/login"><Auth updateToken={this.updateToken}/></Route>
                <Route path="/logout" component={Auth} />
                <Route path="/leaderBoard" component={LeaderBoards} />
                <Route path="/message"> <Message token={this.state.token} /></Route>
              </Switch>
            </Router>
          </Grid>
          <Grid container item xs className={classes.leaderboard}>
            <LeaderBoards />
          </Grid>
        </Grid>
      </div>
    );
  }
}





export default withStyles(styles)(App);
