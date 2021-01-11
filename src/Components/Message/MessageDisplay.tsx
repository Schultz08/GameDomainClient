import React from "react"
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Button, TextField } from "@material-ui/core"
import { Redirect, Link } from "react-router-dom";
import ReplyMessage from "./ReplyMessage"
import UpdateMessage from "./UpdateMessage"

//Message
type myProps = {
    conversation?: any;
    classes: any;
    token: string;
    deleteMessage(id: number, isReplyMessage: boolean): void;
    loggedInUserId: number | null;
}

type myState = {
    messages: any;
    page: number;
    rowsPerPage: number;
    isOpen: boolean;
    showReply: boolean;
    isReply: boolean;
    isUpdate: boolean;
    parentMessage: any;
    messageToUpdate: any | null;
}

//Row Fragment props/state

type rowState = {
    isOpen: boolean;
    message: any;
    showReply: boolean;
    activeReply: number | null;
    reload: boolean | null;
}

type rowProps = {
    message: any;
    replyToMessage(message: any): void;
    deleteMessage(id: number, isReplyMessage: boolean): void;
    updateMessage(message: any): void;
    classes: any;
    loggedInUserId: number | null;
}
//

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
    replyMessageTable: {
        width: "50%",
        margin: 2,
        marginInlineStart: "auto",
    },
    replyMessageHeader: {
        width: "49%",
        margin: 2,
        marginTop: 5,

    },
    replyMessageBody: {
        margin: 2,
        marginTop: 10,

    },
}))

//This creates the Rows for the table as fragments
class Row extends React.Component<rowProps, rowState>{
    constructor(props: rowProps) {
        super(props)
        this.state = {
            isOpen: false,
            message: this.props.message,
            showReply: false,
            activeReply: null,
            reload: null,
        }
    }

    // handles the display of the reply messageBody. so only the selected reply message is displayed.
    handleShowReply = (id: number) => {
        if (this.state.activeReply == null) {
            this.setState({ activeReply: id })
            this.setState({ showReply: !this.state.showReply })
        } else if (this.state.activeReply !== id) {
            this.setState({ activeReply: id })
        } else if (this.state.activeReply == id) {
            this.setState({ showReply: !this.state.showReply })
            this.setState({ activeReply: null })
        }
    }

    // could of been fine is i left it as onclick={this.setState({isOpen: !this.state.isOpen})} however, I wanted the reply messages to close when the user closes that message conversation.
    handleOpen = () => {
        if (this.state.isOpen == false) {
            this.setState({ isOpen: true })
        } else {
            this.setState({ isOpen: false })
            this.setState({ showReply: false })
            this.setState({ activeReply: null })
        }
    }

    handleDelete = (id: number) => {
        this.props.deleteMessage(id, true)
        this.setState({ reload: !this.state.reload })
    }
    //Because i wanted the replyMessageBody to display above the table not below i made it into a function that shows/hides when user clicks on a reply message. This function will replace the current messageBody being displayed
    replyBodyDisplay = (theMessage: any) => {
        console.log(this.state.activeReply)
        if (this.state.showReply) {
            let modelDate = theMessage.replies[this.state.activeReply!].createdAt, newDate = (new Date(modelDate)).toLocaleString();
            return (
                <div>
                    <TextField className={this.props.classes.replyMessageHeader} id="from"
                        label="From"
                        value={theMessage.user.userName}
                        fullWidth
                        InputProps={{
                            readOnly: true
                        }}
                        variant="outlined"
                    />
                    <TextField className={this.props.classes.replyMessageHeader} id="sent"
                        label="sent"
                        value={newDate}
                        fullWidth
                        InputProps={{
                            readOnly: true
                        }}
                        variant="outlined"
                    />
                    <TextField className={this.props.classes.replyMessageBody}
                        id="messageBody"
                        label="Message"
                        value={theMessage.replies[this.state.activeReply!].messageBody}
                        variant="outlined"
                        InputProps={{
                            readOnly: true
                        }}
                        multiline
                        rows={10}
                        rowsMax={10}
                        fullWidth
                    />
                </div>
            )

        } else {
            return null
        }
    }


    //to prevent a .map on undifined error this function was made to display the replies table only if the message has replies.
    replyConductor = (messages: any) => {
        console.log(messages, "replyConductor")
        if (this.state.message.replies.length > 0) {
            return (
                <Table className={this.props.classes.replyMessageTable} size="small" aria-label="replies">
                    <TableHead>
                        <TableRow>
                            <TableCell>From</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {messages.replies.map((replies: any, index: number) => (
                            <TableRow key={index} selected={this.state.activeReply == index ? true : false}>
                                <TableCell component="th" scope="row">
                                    {messages.user.userName}
                                </TableCell>
                                <TableCell>{replies.subject}</TableCell>
                                <TableCell>
                                    <Button onClick={() => this.handleShowReply(index)}>
                                        View
                                    </Button>
                                    <Button onClick={() => this.handleDelete(replies.id,)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )
        } else {
            return (
                null
            )
        }
    }
    render() {
        console.log(this.state.message, "Row message")
        return (
            <React.Fragment>
                <TableRow>
                    <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={this.handleOpen}>
                            {this.state.isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {this.state.message.user.userName}
                    </TableCell>
                    <TableCell align="right">{this.state.message.subject}</TableCell>
                    <TableCell
                        align="right">
                        <Button
                            onClick={() => this.props.replyToMessage(this.state.message)}
                        >
                        Reply
                        </Button>
                        {this.state.message.senderId == this.props.loggedInUserId ? 
                        <Button onClick={() => this.props.updateMessage(this.state.message)}>
                            Update
                        </Button> 
                        : null
                        }
                        <Button onClick={() => this.props.deleteMessage(this.state.message.id, true)}>
                            Delete
                        </Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={this.state.isOpen} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                {
                                    this.state.showReply ? null
                                        : <TextField
                                            id="messageBody"
                                            label="Message"
                                            defaultValue={this.state.message.messageBody}
                                            variant="outlined"
                                            InputProps={{
                                                readOnly: true
                                            }}
                                            multiline
                                            rows={10}
                                            rowsMax={10}
                                            fullWidth
                                        />
                                }
                                {this.replyBodyDisplay(this.state.message)}
                                {this.replyConductor(this.state.message)}
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }
}


class MessageDisplay extends React.Component<myProps, myState>{
    constructor(props: myProps) {
        super(props)
        this.state = {
            messages: this.props.conversation.messages,
            showReply: false,
            page: 0,
            rowsPerPage: 10,
            isOpen: false,
            isReply: false,
            isUpdate: false,
            parentMessage: null,
            messageToUpdate: null,
        }
    }
    //for paginate if i get to it
    handleChangePage = (event: unknown, newPage: number) => {
        this.setState({ page: newPage });
    };

    handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ rowsPerPage: +event.target.value });
        this.setState({ page: 0 });
    };


    displayConductor = (classes: any) => {
        if (this.state.isReply) {
            return (
                <ReplyMessage token={this.props.token} parentMessage={this.state.parentMessage} replyToMessage={this.replyToMessage} />
            )
        } else if(this.state.isUpdate){
            return (
                <UpdateMessage token={this.props.token} messageToUpdate={this.state.messageToUpdate} updateMessage={this.updateMessage} />
            )
        }else{
            return (
                <TableContainer>
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
                            {this.state.messages ? this.state.messages.map((message: any, index: number) => (
                                <Row
                                    key={index}
                                    message={message}
                                    classes={classes}
                                    replyToMessage={this.replyToMessage}
                                    deleteMessage={this.props.deleteMessage}
                                    updateMessage={this.updateMessage}
                                    loggedInUserId={this.props.loggedInUserId}
                                />))
                                : <Typography variant="h4">Loading</Typography>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

            );
        };
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

    //with the message? allows this function multi purpose. So when I call the function in the Row class I pass the message the user wants to reply/update then switch the view to the reply/update view. then when the user send/submits their reply/update i call this function again. This time is dose not pass a message skips setting the message and just switches back to the inbox view.
    //Downside is this file is code heavy but pertty neat though.
    replyToMessage = (message?: any) => {
        if (message) {
            this.setState({ parentMessage: message })
        }
        this.setState({ isReply: !this.state.isReply })
    }

    updateMessage = (message?: any) => {
        if (message) {
            this.setState({ messageToUpdate: message })
        }
        this.setState({ isUpdate: !this.state.isUpdate })
    }



    render() {
        const { classes } = this.props;

        return (
            this.displayConductor(classes)
        );
    };
}
export default withStyles(styles)(MessageDisplay)
