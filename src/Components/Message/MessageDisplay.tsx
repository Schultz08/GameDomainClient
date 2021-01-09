import React from "react"
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Button } from "@material-ui/core"


type myProps = {
    conversation?: any;
    classes: any;
}

type myState = {
    messages: any;
    messageList: any;
    // repliesList: any;
    page: number;
    rowsPerPage: number;
    isOpen: boolean;
    showReply: boolean;
}

const styles = ((theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
    },
    message: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: "red",
        backGroundColor: "blue",
    },
    replyMessage: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.primary,
        backGroundColor: "red"

    }
}))


class MessageDisplay extends React.Component<myProps, myState>{
    constructor(props: myProps) {
        super(props)
        this.state = {
            messages: this.props.conversation.messages,
            messageList: this.createMessageList(),
            showReply: false,
            page: 0,
            rowsPerPage: 10,
            isOpen: false,
        }
    }
    handleChangePage = (event: unknown, newPage: number) => {
        this.setState({ page: newPage });
    };

    handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ rowsPerPage: +event.target.value });
        this.setState({ page: 0 });
    };

    createMessageList = () => {
        let data = this.props.conversation.messages.map((data: any) => (
            {
                id: data.senderId,
                from: data.senderId,
                subject: data.subject
            }
        ))
        return data
    }
    replyConductor = (messages: any) => {
        console.log(messages,"replyConductor")
        if (messages.message.replies.length > 0) {
            return(
                <Table size="small" aria-label="replies">
                <TableHead>
                    <TableRow>
                        <TableCell>From</TableCell>
                        <TableCell>Subject</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {messages.message.replies.map((replies: any) => (
                        <Button onClick={() => this.replyBodyDisplay(replies)}>

                            <TableRow key={replies.Id}>
                                <TableCell component="th" scope="row">
                                    {replies.senderId}
                                </TableCell>
                                <TableCell>{replies.subject}</TableCell>
                            </TableRow>
                        </Button>
                    ))}
                </TableBody>
            </Table>
            )
        } else {
            return (
                <Typography variant="h2">No replies to this message</Typography>
                )
        }
    }
    replyBodyDisplay = (replies?: any) => {
        if (replies) {
            this.setState({ showReply: !this.state.showReply })
            return (

                <Typography variant="h2" gutterBottom component="div">
                    From: {replies.senderId}
                    <Typography variant="h2" gutterBottom component="div">
                        {replies.messageBody}
                    </Typography>
                </Typography>
            )

        } else {
            return null
        }
    }

    Row = (message: any) => {


        return (
            <React.Fragment>
                <TableRow>
                {/* className={} */}
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => this.setState({ isOpen: !this.state.isOpen })}>
                            {this.state.isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {console.log(message, "My message in table")}
                        {message.message.senderId}
                    </TableCell>
                    <TableCell align="right">{message.message.subject}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={this.state.isOpen} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <Typography variant="h4" gutterBottom component="div">
                                    {message.message.messageBody}
                                </Typography>
                                {this.replyBodyDisplay()}
                                {this.replyConductor(message)}
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    updateMessageList = () => {
        let data = this.props.conversation.messages.map((data: any) => (
            {
                id: data.senderId,
                from: data.senderId,
                subject: data.subject

            }
        ))
        this.setState({ messages: data })
    }





    render() {
        const { classes } = this.props;

        return (
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>From</TableCell>
                            <TableCell align="right">Subject</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {console.log(this.state.messages, "The State is display")}
                        {this.state.messages? this.state.messages.map((message: any) => (
                            <this.Row key={message.id} message={message} />)) : <Typography variant="h4">Loading</Typography>
                        }
                    </TableBody>
                </Table>
            </TableContainer>

        );
    };
}
export default withStyles(styles)(MessageDisplay)
