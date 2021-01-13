import React from "react"
import { Button, Typography, withStyles, createStyles, TextField, Theme, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, TableHead, createMuiTheme } from "@material-ui/core"


const styles = (theme: Theme) => createStyles({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
    baseTable: {
        width: "100%"
    },
    space: {
        margin: 5,
    },
    gameName: {
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 1,
    },
    gameScore: {
        marginLeft: 1,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5,
    },
    buttonDiv: {
        width: "100%"
    }

})

interface Column {
    id: 'id' | 'userName';
    label: string;
    minWidth?: number;
    align?: 'right';
}

const columns: Column[] = [
    { id: 'id', label: 'ID', minWidth: 170 },
    { id: 'userName', label: 'User Name', minWidth: 100 },

];

type myProps = {
    classes: any;
    token: string | null;
}

type myState = {
    isAdmin: boolean;
    adminPassword: string;
    userList: any;
    page: number;
    rowsPerPage: number;
    editUser: any;
    isEdit: boolean;
    isShowingTable: boolean;

}


class AdminMenu extends React.Component<myProps, myState>{
    constructor(props: myProps) {
        super(props)
        this.state = {
            isAdmin: false,
            adminPassword: "",
            userList: null,
            page: 0,
            rowsPerPage: 10,
            isEdit: false,
            editUser: [],
            isShowingTable: false,

        }
    }

    createAdmin = (event: any) => {
        if (this.state.adminPassword == "okiedokie") {

            let body = { userRole: "Admin" }

            fetch(`http://localhost:3000/user/admin`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")!
                },
                body: JSON.stringify(body)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    this.setState({ isAdmin: true })
                    localStorage.setItem("Admin", data.userRole)
                })
                .catch(err => console.log(err))
        } else {
            console.log("Not Authorized")
        }

    }
    getUsers = () => {
        fetch(`http://localhost:3000/user/getEmAll`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")!
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)

                this.setState({ userList: data, isShowingTable: false })
            })
            .catch(err => console.log(err))

    }

    handleChangePage = (event: unknown, newPage: number) => {
        this.setState({ page: newPage });
    };

    handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ rowsPerPage: +event.target.value });
        this.setState({ page: 0 });
    };

    changeToEdit = (user: any) => {
        this.setState({ editUser: user, isEdit: true })

    }

    resetScore = (game: any) => {

        let body = {
            gameName: game.gameName,
            score: 0,
        }

        fetch("http://localhost:3000/score/updateScore", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": this.props.token!

                    },
                    body: JSON.stringify(body)
                })
                    .then(res => res.json())
                    .catch(err => console.log(err))

    }

    editDisplay = (classes: any) => {
        console.log(this.state.userList)
        console.log(this.state.editUser.scores)
        console.log(this.state.editUser.scores.length)

        return (
            <div>

                <TextField
                    className={classes.space}
                    color="secondary"
                    id="firstName"
                    label="User's First Name"
                    variant="outlined"
                    defaultValue={this.state.editUser.firstName}
                    inputProps={{
                        readOnly: true
                    }}
                />
                <TextField
                    className={classes.space}
                    color="secondary"
                    id="lastName"
                    label="User's Last Name"
                    variant="outlined"
                    defaultValue={this.state.editUser.lastName}
                    inputProps={{
                        readOnly: true
                    }}
                />
                <TextField
                    className={classes.space}
                    color="secondary"
                    id="userName"
                    label="User's User Name"
                    variant="outlined"
                    defaultValue={this.state.editUser.userName}
                    inputProps={{
                        readOnly: true
                    }}
                />

                <TextField
                    className={classes.space}
                    color="secondary"
                    id="email"
                    label="User's email"
                    variant="outlined"
                    defaultValue={this.state.editUser.email}
                    inputProps={{
                        readOnly: true
                    }}
                />
                <div>
                    {this.state.editUser.scores.length > 0 ?
                        this.state.editUser.scores.map((game: any, index: number) => {
                            return (

                                <div>
                                    <TextField
                                        className={classes.gameName}
                                        color="secondary"
                                        id={game.gameName}
                                        label={`Game ${index + 1}`}
                                        variant="outlined"
                                        defaultValue={game.gameName}
                                        inputProps={{
                                            readOnly: true
                                        }}
                                    />
                                    <TextField
                                        className={classes.gameScore}
                                        color="secondary"
                                        id={game.score}
                                        label={`Game ${index + 1}`}
                                        variant="outlined"
                                        defaultValue={game.score}
                                        inputProps={{
                                            readOnly: true
                                        }}

                                    />
                                    <div className={classes.buttonDiv}>
                                        <Button onClick={() => this.resetScore(game)}>Reset Score</Button>
                                    </div>
                                </div>
                            )

                        })
                        :
                        <Typography>User has no saved games</Typography>
                    }
                </div>


            </div>
        )

    }

    makeTable = (classes: any) => {

        if (this.state.userList) {
            console.log(this.state.userList)
            return (
                <div >

                    <TableContainer className={classes.baseTable}>
                        <Table stickyHeader aria-label="sticky table" className={classes.baseTable}>
                            <TableHead>
                                <TableRow>

                                    {columns.map((column) =>
                                        <TableCell key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    )}
                                    <TableCell>
                                        Saved Games
                                    </TableCell>

                                    <TableCell>
                                        Edit
                                    </TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.userList.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((user: any, index: any) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                            {
                                                columns.map((columns: any) => {
                                                    const value = user[columns.id]
                                                    return (
                                                        <TableCell key={columns.id}>
                                                            {value}
                                                        </TableCell>
                                                    );
                                                })
                                            }
                                            <TableCell align="right">
                                                
                                                {user.scores.length}
                                            </TableCell>

                                            <TableCell>
                                                <Button onClick={() =>
                                                    this.changeToEdit(user)
                                                }>Edit</Button>
                                            </TableCell>

                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={this.state.userList.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                </div>

            )
        } else {
            return null
        }
    }


    displayConductor = (classes: any) => {

        if (this.state.isEdit) {
            console.log("did i switch?")
            return (
                this.editDisplay(classes)
            )
        }
        if (this.state.isAdmin || localStorage.getItem("Admin")) {
            return (
                <div className={classes.baseTable}>
                    { !this.state.isShowingTable ?
                        <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={() => this.getUsers()}
                        >
                        Get all Users
                    </Button>
                    :
                    null
                    }
                    {this.makeTable(classes)}
                </div>
            )



        } else {

            return (

                <div>
                    <Typography>Admin Verification</Typography>
                    <TextField
                        color="secondary"
                        id="adminPassword"
                        label="Admin Password"
                        fullWidth
                        variant="outlined"
                        type="password"
                        onChange={(event) => this.setState({ adminPassword: event.target.value })}
                    />
                    <Button variant="contained" color="primary" onClick={(event) => this.createAdmin(event)}>Send</Button>
                </div>
            )

        }
    }


    render() {
        const { classes } = this.props
        return (
            this.displayConductor(classes)
        )
    }

}


export default withStyles(styles)(AdminMenu)
