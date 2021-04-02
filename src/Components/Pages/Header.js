import React, { useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withRouter } from "react-router-dom";
import { UserContext } from "../../App";
import { Avatar } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        paddingBottom: "1rem"
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 2,
        cursor: 'pointer'
    },
    headerOptions: {
        display: "flex",
        flex: 1
    }
}));

const Header = props => {
    const { history } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClick = pageURL => {
        history.push(pageURL);
        setAnchorEl(null);
    };

    const handleButtonClick = pageURL => {
        history.push(pageURL);
    };

    const menuItems = [
        {
            menuTitle: "Home",
            pageURL: "/",
            id: 110
        },
        {
            menuTitle: "Orders",
            pageURL: "/orders",
            id: 210
        },
        {
            menuTitle: "Admin",
            pageURL: "/admin",
            id: 310
        },
        {
            menuTitle: "Deals",
            pageURL: "/deals",
            id: 410
        },
        {
            menuTitle: "Login",
            pageURL: "/login",
            id: 510
        }
    ];


    const [user] = useContext(UserContext);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} onClick={() => handleButtonClick("/")} >
                       Boi Ghor
                    </Typography>
                    {isMobile ? (
                        <>
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu"
                                onClick={handleMenu}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                }}
                                open={open}
                                onClose={() => setAnchorEl(null)}
                            >
                                {menuItems.map(menuItem => {
                                    const { menuTitle, pageURL, id } = menuItem;
                                    return (
                                        <MenuItem onClick={() => handleMenuClick(pageURL)} key={id}>
                                            {menuTitle}
                                        </MenuItem>
                                    );
                                })}
                            </Menu>
                        </>
                    ) : (
                        <div className={classes.headerOptions}>
                            <Button
                                style={{ color: 'white' }}
                                onClick={() => handleButtonClick("/")}
                            >
                                HOME
                            </Button>
                            <Button
                                style={{ color: 'white' }}
                                onClick={() => handleButtonClick("/orders")}
                            >
                                Orders
                            </Button>
                            <Button
                                style={{ color: 'white' }}
                                onClick={() => handleButtonClick("/admin")}
                            >
                                Admin
                            </Button>
                            <Button
                                style={{ color: 'white' }}
                                onClick={() => handleButtonClick("/deals")}
                            >
                                deals
                            </Button>
                            {
                                user.email ? <Avatar src={user.photoURL}/> :

                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleButtonClick("/login")}
                                    >
                                        login
                                    </Button>
                            }
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default withRouter(Header);
