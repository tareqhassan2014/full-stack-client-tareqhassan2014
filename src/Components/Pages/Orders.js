import { Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { UserContext } from "../../App";



const useStyle = makeStyles(theme => ({
    managebook: {
        left: "15%",
        top: "4rem",
        width: "85%",
        height: "100%",
        borderRadius: 0,
    }
}))




const Orders = () => {
    const classes = useStyle();
    const [books, setBooks] = useState()
    const [user] = useContext(UserContext);

    useEffect(() => {
        fetch(`http://localhost:5055/orders/${user.email}`)
            .then(res => res.json())
            .then(data => setBooks(data))
    }, [user.email]);



    const handelDelet = (id) => {
        console.log(id);
        fetch(`http://localhost:5055/deletBook/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
            })
    }


    return (
        <div className={classes.managebook}>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Book Name</TableCell>
                                <TableCell>Author Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                books?.map(book =>
                                    <TableRow key={book?._id}>
                                        <TableCell>{book?.BookName}</TableCell>
                                        <TableCell>{book?.AuthorName}</TableCell>
                                        <TableCell>${book?.Price}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => handelDelet(book._id)}
                                                variant="contained"
                                                color="secondary"
                                                className={classes.button}
                                                startIcon={<DeleteIcon />}
                                            >
                                                remove
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </div>
    );
};

export default Orders;