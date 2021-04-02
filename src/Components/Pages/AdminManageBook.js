import { Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyle = makeStyles(theme => ({
    managebook: {
        left: "15%",
        top: "4rem",
        width: "85%",
        height: "100%",
        borderRadius: 0,
    }
}))




const AdminManageBook = () => {
    const classes = useStyle();
    const [books, setBooks] = useState()

    useEffect(() => {
        fetch(`http://localhost:5055/books`)
            .then(res => res.json())
            .then(data => setBooks(data))
    }, []);



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
                                                Delete
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

export default AdminManageBook;