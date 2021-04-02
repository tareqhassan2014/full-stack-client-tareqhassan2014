import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';

const CheckOut = () => {
    const { _id } = useParams();
    const [books, setBooks] = useState([]);
    const [user] = useContext(UserContext);

    useEffect(() => {
        fetch(`https://infinite-ravine-31515.herokuapp.com/books`)
            .then(res => res.json())
            .then(data => setBooks(data))
    }, []);


    const findBook = books.find(book => book._id === _id);


    const handelCheckOut = () => {

        const newOrder = {
            email: user.email,
            BookName: findBook.BookName,
            AuthorName: findBook.AuthorName,
            Price: findBook.Price,
            Photo_URL: findBook.Photo_URL,
        }

        axios.post(`https://infinite-ravine-31515.herokuapp.com/addOrder`, newOrder)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }


    return (
        <div>
            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Discription</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>{findBook?.BookName}</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>${findBook?.Price}</TableCell>
                            </TableRow>
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell>Total</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>${findBook?.Price}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Paper>
            <div style={{ display: "flex" }}> <Button color="secondary" variant="contained" onClick={handelCheckOut}>Check Out</Button></div>
        </div>
    );
};

export default CheckOut;