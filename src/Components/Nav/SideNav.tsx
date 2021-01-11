import React from "react";
import { Theme } from '@material-ui/core/styles';
import { withStyles } from "@material-ui/core/styles";
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from "@material-ui/core" 
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';


const styles = (theme:Theme) => ({
    root: {
            width: '100%',
            maxWidth: 360,
          },
          nested: {
            paddingLeft: theme.spacing(4),
          },
  });

type myProps = {
    token: string | null;
    classes: any;
    clearToken(): void;
}
type myState = {
    isLoggedIn: boolean;
    open: boolean;
    token: string | null;
}
  
     
  class SideNav extends React.Component<myProps, myState>{
      constructor(props: myProps){
          super(props)
          this.state = {
            isLoggedIn: false,
            open: false,
            token: ""
            }
        }

        componentDidMount(){
          if(localStorage.getItem("token")){
            this.setState({isLoggedIn: true})
            this.setState({token: localStorage.getItem("token")})
          }else{
            this.setState({isLoggedIn:false})
            this.setState({token: ""})
          }
              // if(this.props.token){
              //      this.setState({isLoggedIn: true})
              //      this.setState({token: this.props.token})
              // }else{
              //      this.setState({isLoggedIn: false})
              //      this.setState({token: this.props.token})
              // }
        }

        componentDidUpdate(){
          console.log("did update")
          if(localStorage.getItem("token") !== this.state.token){
            this.setState({isLoggedIn: true})
            this.setState({token: localStorage.getItem("token")}) 
          }else if(!localStorage.getItem("token") && this.state.isLoggedIn == true){
            this.setState({isLoggedIn: false})
            this.setState({token: localStorage.getItem("token")})
          }
      //     if(this.props.token !== this.state.token){
      //       this.setState({isLoggedIn: true})
      //       this.setState({token: this.props.token})
      //  }else if(!this.props.token && this.state.isLoggedIn == true){
      //       this.setState({isLoggedIn: false})
      //       this.setState({token: this.props.token})
      //  }
        }

        loginDisplay = (classes:any) =>{
            if(this.state.isLoggedIn){
              return(
                <div>
        
                <ListItem button onClick={this.handleClick}>
                <ListItemIcon>
                  <DraftsIcon/>
                </ListItemIcon>
                <ListItemText primary="Mail" />
                {this.state.open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link color="inherit" href="/message">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                  </ListItem>
                  </Link>
                  <Link color="inherit" href="/sendmessage">
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="New Message" />
                  </ListItem>
                  </Link>
                </List>
              </Collapse>
              <ListItem button onClick={this.handleLogout}>
                <ListItemText primary="Logout"/>
              </ListItem>

                </div>
              )   }else{
                return (
                  <div>
          
                  <Link color="inherit" href="/login">
                  <ListItem button>
                  <ListItemIcon>
                  </ListItemIcon>
                  <ListItemText primary="login/signup" />
                </ListItem>
                  </Link>
          
          {/* <Link color="inherit" href="/register">
          <ListItem button>
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="login" />
          </ListItem>
          </Link> */}
                  </div>
                  
                )
              }
            }
            handleLogout = () => {
              this.props.clearToken()
              localStorage.clear()
              }
              handleClick = () => {
                this.setState({open: !this.state.open});
              };
    render(){

        const {classes} = this.props;
    return (
      <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Welcome to GameDomain!
        </ListSubheader>
      }
      className={classes.root}
      >
        <Link color="inherit" href="/leaderboard">
      <ListItem button>
        <ListItemIcon>
        </ListItemIcon>
        <ListItemText primary="Check the LeaderBoards!" />
      </ListItem>
        </Link>
        <Link color="inherit" href="/game">
      <ListItem button>
        <ListItemIcon>
        </ListItemIcon>
        <ListItemText primary="Play A Game!!!" />
      </ListItem>
        </Link>
        {this.loginDisplay(classes)}
    </List>
  );
}
}

export default withStyles(styles)(SideNav)