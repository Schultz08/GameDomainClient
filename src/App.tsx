import React from 'react';
import { Auth, LeaderBoards, Message, SideNav, SendMessage } from "./Components"
import myGame from "./Games/myGame"
import { Route, Switch, BrowserRouter as Router } from "react-router-dom"
import { withStyles, makeStyles, createStyles } from '@material-ui/core/styles';
import { Theme, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Grid, Button } from "@material-ui/core"
import * as themes from "./theme/themes"

import Video from "./assets/GameVid.mp4"

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       main: red[500]
//     },
//   },
// });

const styles = (theme: Theme) => createStyles({
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
  token: string | null;
  theme: string | null;
}

type myProps = {
  classes: any;
}


class App extends React.Component<myProps, myState>{
  constructor(props: myProps) {
    super(props)
    this.state = {
      token: "",
      theme: localStorage.getItem("theme") ? localStorage.getItem("theme") : "mainTheme",
    }
  }

  componentDidMount() {
    let token = localStorage.getItem("token");
    this.setState({ token: token });

    if (!localStorage.getItem("theme") && this.state.token) {
      fetch(`http://localhost:3000/user/theme`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")!
        }
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState({ theme: data })
          localStorage.setItem("theme", data)
        })
        .catch(err => console.log(err))
    }

  }

  componentDidUpdate() {
    if (this.state.token !== localStorage.getItem("token")) {
      this.setState({ token: localStorage.getItem("token") })
    }

    if (!localStorage.getItem("theme") && this.state.token) {
      fetch(`http://localhost:3000/user/theme`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")!
        }
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState({ theme: data })
          localStorage.setItem("theme", data)
        })
        .catch(err => console.log(err))
    }
  }

  updateToken = (token: string) => {
    this.setState({ token: token })
  }

  clearToken = () => {
    this.setState({ token: "" })
  }

  getTheme = () => {
    switch (this.state.theme) {
      case "darkTheme":
        return themes.darkTheme
      case "main":
        return themes.mainTheme
      case "sunset":
        return themes.sunsetTheme
      default:
        return themes.mainTheme
    }

  }

  render() {
    const { classes } = this.props;
    const theme = this.getTheme()
    return (
      <ThemeProvider theme={theme}>

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
                  <Route path="/login"><Auth updateToken={this.updateToken} /></Route>
                  <Route path="/leaderBoard" component={LeaderBoards} />
                  <Route path="/message"> <Message token={this.state.token} /></Route>
                  <Route path="/sendmessage"> <SendMessage token={this.state.token} /></Route>
                </Switch>
              </Router>
            </Grid>
            <Grid container item xs className={classes.leaderboard}>
              <LeaderBoards />
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    );
  }
}





export default withStyles(styles)(App);
