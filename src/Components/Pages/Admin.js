import { Box, Container, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper } from '@material-ui/core';
import React, { useState } from 'react';
import WidgetsIcon from '@material-ui/icons/Widgets';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import AdminManageBook from './AdminManageBook';
import AdminAddBooks from './AdminAddBooks';



const useStyle = makeStyles(theme => ({
    sideBar: {
        position: "fixed",
        right: 0,
        top: "4rem",
        width: "15%",
        height: "100%",
        borderRadius: 0,
    }
}))

const Admin = () => {
    const classes = useStyle();

    const [Show, setShow] = useState(true);

    const ShowManageBook = () => {
        setShow(true);
    }

    const ShowAddBooks = () => {
        setShow(false);
    }


    return (
        <Container>
            <Paper component={Box} boxShadow={4} className={classes.sideBar}>
                <List disablePadding>
                    <ListItem button onClick={ShowManageBook} >
                        <ListItemText primary="Manage Book" />
                        <ListItemIcon>
                            <WidgetsIcon />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem button onClick={ShowAddBooks} >
                        <ListItemText primary="Add Book" />
                        <ListItemIcon>
                            <AddBoxOutlinedIcon />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Edit Book" />
                        <ListItemIcon>
                            <BorderColorIcon />
                        </ListItemIcon>
                    </ListItem>
                </List>
            </Paper>
            {
                Show ? <AdminManageBook /> : <AdminAddBooks />
            }
        </Container>
    );
};

export default Admin;