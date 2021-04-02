import "firebase/auth";
import React, { useContext } from 'react';
import firebase from "firebase/app";
import { GoogleLoginButton } from "react-social-login-buttons";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";


const firebaseConfig = {
    apiKey: "AIzaSyAuC-QHGMHoYjRL-A_RO-xHYp1cbwLOWro",
    authDomain: "full-stack-client-book-shop.firebaseapp.com",
    projectId: "full-stack-client-book-shop",
    storageBucket: "full-stack-client-book-shop.appspot.com",
    messagingSenderId: "284339859473",
    appId: "1:284339859473:web:505b37dc9dc6cac936c1b0"
};


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


const LogIn = () => {


    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const [user, setUser] = useContext(UserContext);

    const HandelGoogleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const sigedinUser = { ...user, ...result.user };
                setUser(sigedinUser);
                history.replace(from);
            }).catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage);
            });


    }





    return (
        <div>
            <GoogleLoginButton onClick={() => HandelGoogleLogin()} />
        </div>
    );
};

export default LogIn;