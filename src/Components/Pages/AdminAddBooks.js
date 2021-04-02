import { useForm } from 'react-hook-form';
import { Button, Divider, Grid, Paper, TextField, } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import axios from 'axios';
import { useState } from 'react';



const paperStyle = { padding: "30px 20px", width: 320, margin: "0 auto" }

const SignUp = ({ handleChange }) => {

    const { register, handleSubmit, errors } = useForm();
    const [Photo_URL, setPhoto_URL] = useState(null);




    const onSubmit = data => {
        const bookData = {
            BookName: data.BookName,
            AuthorName: data.AuthorName,
            Price: data.Price,
            Photo_URL: Photo_URL,
        }

        axios.post(`http://localhost:5055/admin/addBook`, bookData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };


    const handelImageUpload = event => {
        const imageData = new FormData();
        imageData.set('key', 'b49132eaa6140a7454307cd54226d69f');
        imageData.append("image", event.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(response => {
                setPhoto_URL(response.data.data.display_url);
                console.log("photo adde.");
            })
            .catch(error => {
                console.log(error);
            });

    }






    return (
        <Grid>
            <Paper style={paperStyle}>
                <form onSubmit={handleSubmit(onSubmit)} >


                    <TextField
                        style={{ marginBottom: 10 }}
                        placeholder="Enter Book Name"
                        label="Book Name"
                        variant="outlined"
                        fullWidth
                        name="BookName"
                        inputRef={register({
                            required: 'Name is required.'
                        })}
                        error={Boolean(errors.BookName)}
                        helperText={errors.BookName?.message}
                    />

                    <TextField
                        style={{ marginBottom: 10 }}
                        placeholder="Enter Author Name"
                        label="Author Name"
                        variant="outlined"
                        fullWidth
                        name="AuthorName"
                        inputRef={register({
                            required: 'Name is required.'
                        })}
                        error={Boolean(errors.AuthorName)}
                        helperText={errors.AuthorName?.message}
                    />


                    <TextField
                        style={{ marginBottom: 10 }}
                        placeholder="Enter Book price"
                        label="Price"
                        variant="outlined"
                        fullWidth
                        name="Price"
                        inputRef={register({
                            required: 'Price is required.'
                        })}
                        error={Boolean(errors.Price)}
                        helperText={errors.Price?.message}
                    />

                    <input type="file" name="Photo_URL"  style={{ display: "none" }} id="contained-button-file" onChange={handelImageUpload} />
                    
                    <label htmlFor="contained-button-file">
                        <Button
                            variant="contained"
                            color="default"
                            component="span"
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload Image
                        </Button>
                    </label>



                    <Button
                        style={{ marginTop: 20 }}
                        variant="contained"
                        color="secondary"
                        type="submit"
                        fullWidth
                    >
                        Add Book
                    </Button>
                </form>
                <Divider />
            </Paper>
        </Grid>
    );
};

export default SignUp;