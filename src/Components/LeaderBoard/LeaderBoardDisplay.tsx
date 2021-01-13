import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { DataGrid, ColDef } from '@material-ui/data-grid';

const useStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: "center",
        }

    })
)


const LeaderBoardsDisplay = (props: any) => {
    const classes = useStyle();
    return (
        <div className={classes.root}>
            
            <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                {
                    props.players.map((player: any, index: number) => {
                        return (
                            <Grid item xs key={index}>
                              
                                    {player.gameName}<br/>
                                    {player.user.userName}<br/>
                                    {player.score}
                               
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    )

}

export default LeaderBoardsDisplay;