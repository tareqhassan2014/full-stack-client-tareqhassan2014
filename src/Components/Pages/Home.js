import { Box, CircularProgress, Container, Grid } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import Book from './Book';

const Home = () => {


    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch(`https://infinite-ravine-31515.herokuapp.com/books`)
            .then(res => res.json())
            .then(data => setBooks(data))
    }, []);


    return (
        <Fragment>
            {
                books.length > 0 || <Box py={30} textAlign="center">< CircularProgress color="secondary" /></Box>
            }
            <Container p={1} >
                <Grid container spacing={4}>
                    {
                        books.map(book => <Book key={book._id} book={book}></Book>)
                    }
                </Grid>
            </Container>
        </Fragment>
    );
};

export default Home;