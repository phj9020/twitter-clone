import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "routes/Home";
import Auth from "routes/Auth";

const MainRouter = ({isLoggedIn}) => {
  return (
    <Router>
    <Switch>
        {isLoggedIn ? (
            <>
            <Route path="/">
                <Home />
            </Route>
            </>
        ) : (
            <Route path="/">
                <Auth />
            </Route>
        )}
    </Switch>
    </Router>
  );
};

export default MainRouter;
