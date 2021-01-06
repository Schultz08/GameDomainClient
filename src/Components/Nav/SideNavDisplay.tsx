import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles";
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

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       width: '100%',
//       maxWidth: 360,
//       backgroundColor: theme.palette.background.paper,
//     },
//     nested: {
//       paddingLeft: theme.spacing(4),
//     },
//   }),
// );

const styles = (theme:Theme) => ({
  root: {
          width: '100%',
          maxWidth: 360,
          backgroundColor: theme.palette.background.paper,
        },
        nested: {
          paddingLeft: theme.spacing(4),
        },
})

type myProps = {
  isLoggedIn: boolean;
  classes: any;
}

type myState ={
  isLoggedin: boolean;
  open: boolean;
}

// const [open, setOpen] = React.useState(false);
// const [IsloggedIn] = React.useState(props.isLoggedIn)
// const classes = useStyles();
class SideNavDisplay extends React.Component<myProps, myState> {
constructor(props: myProps){
  super(props)
  this.state = {
    isLoggedin: this.props.isLoggedIn,
    open: false
  }
}

componentDidUpdate(){
  if(this.props.isLoggedIn !== this.state.isLoggedin){
    this.setState({isLoggedin: this.props.isLoggedIn})
  }
}
  

  loginDisplay = (classes:any) =>{
    if(this.state.isLoggedin){
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
        </List>
      </Collapse>
      <Link color="inherit" href="/logout">
      <ListItem button onClick={this.handleLogout}>
        <ListItemText primary="Logout"/>
      </ListItem>
      </Link>
        </div>
      )
    }else{
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
    localStorage.setItem("token", "")
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

export default withStyles(styles)(SideNavDisplay);
