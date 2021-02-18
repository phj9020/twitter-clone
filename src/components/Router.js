import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "routes/Home";
import Auth from "routes/Auth";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const MainRouter = ({isLoggedIn}) => {
  return (
    <Router>
        {isLoggedIn && <Navigation /> }
    <Switch>
        {isLoggedIn ? (
            <>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/profile">
                    <Profile />
                </Route>
            </>
        ) : (
            <>
                <Route exact path="/">
                    <Auth />
                </Route>
            </>
        )}
    </Switch>
    </Router>
  );
};

export default MainRouter;
