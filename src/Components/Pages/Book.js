import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import React from 'react';
import { useHistory } from 'react-router';

const Book = (props) => {

    const { AuthorName, BookName, Photo_URL, Price, _id } = props.book;
    const history = useHistory();

    return (
        <Grid item xs={12} sm={6} lg={4}>
            <Card style={{ background: grey[300] }}>
                <CardActionArea>
                    <CardMedia component="img" image={Photo_URL} style={{ height: 500 }} />
                    <CardContent>
                        <Typography variant="h5">{BookName}</Typography>
                        <Typography variant="subtitle1">{AuthorName}</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Typography variant="h4" color="secondary">${Price}</Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => history.push(`/book/${_id}`)}
                    >
                        BUY Now
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Book;