import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyle = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: "center",
            color: theme.palette.text.primary
        },
        paperReply: {
            padding: theme.spacing(2),
            textAlign: "center",
            color: theme.palette.text.primary
        }

    })
)

const MessageDisplay = (props: any) => {
    const classes = useStyle();
    console.log(props, "Props console")

    return (
        <div className={classes.root}>
            <h1>This is my Messages</h1>

            <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                {
                    props.conversation.messages.map((message: any, index: number) => {
                        return (
                            <Grid item xs key={index}>
                                <Paper className={classes.paper}>
                                    {message.senderId}<br />
                                    {message.subject}<br />
                                    {message.messageBody}
                                </Paper>
                                {
                                    message.replies.map((reply: any, index: number) => {
                                        return (
                                            <Grid item xs key={index}>
                                                <Paper className={classes.paperReply}>
                                                    {reply.senderId}<br />
                                                    {reply.subject}<br />
                                                    {reply.messageBody}
                                                </Paper>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    )
}

export default MessageDisplay;