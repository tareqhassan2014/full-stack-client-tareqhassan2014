import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from "./Components/Pages/Home";
import Admin from "./Components/Pages/Admin";
import Deals from "./Components/Pages/Deals";
import LogIn from "./Components/Pages/LogIn";
import NoMatch from "./Components/Pages/NoMatch";
import Header from "./Components/Pages/Header";
import Orders from "./Components/Pages/Orders";
import CheckOut from "./Components/Pages/CheckOut";
import PrivateRoute from "./Components/Pages/PrivateRoute";



export const UserContext = createContext();


export default function App() {

  const [user, setUser] = useState([]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path="/book/:_id">
            <CheckOut />
          </PrivateRoute>
          <PrivateRoute exact path="/orders">
            <Orders />
          </PrivateRoute>
          <PrivateRoute path="/admin">
            <Admin />
          </PrivateRoute>
          <Route path="/deals">
            <Deals />
          </Route>
          <Route path="/login">
            <LogIn />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}
