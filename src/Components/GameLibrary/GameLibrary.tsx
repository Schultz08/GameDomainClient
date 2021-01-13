import React from "react";
import { Theme, createStyles, makeStyles, withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Button } from "@material-ui/core"
import { Redirect } from "react-router-dom"
import gameData from "./createLibrary"
// const data = require(("../../Games/data.json"))


const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        overflow: "none",
        justifyContent: 'space-around',
        width: "90%",
        height: "90%",
    },
    gridList: {
        width: "90%",
        height: "90%",
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});

type myState = {
    token: string;
    redirect: string;
}

type myProps = {
    token: string;
    classes: any;
}

class GameLibrary extends React.Component<myProps, myState>{
    constructor(props: myProps) {
        super(props)
        this.state = {
            token: "",
            redirect: "",
        }
    }

    render() {
        const { classes } = this.props;
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className={classes.root}>
                <GridList cellHeight={180} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                        <ListSubheader component="div">Game Library</ListSubheader>
                    </GridListTile>
                    {gameData.map((game: any) => (
                        <GridListTile key={game.id}>
                                <img src={game.image} alt={game.name} />
                            <Button onClick={() => this.setState({ redirect: `/${game.name}` })}>
                            </Button>
                            <GridListTileBar
                                title={game.name}
                                subtitle={ 
                                <Button onClick={() => this.setState({ redirect: `/playgame/${game.name}` })}>
                                Play
                                </Button>
                                }
                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );

    }
}


export default withStyles(styles)(GameLibrary);