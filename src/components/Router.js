import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "routes/Home";
import Auth from "routes/Auth";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const MainRouter = ({isLoggedIn, userObj, refreshUser}) => {
  return (
    <Router>
        {isLoggedIn && <Navigation userObj={userObj}/> }
    <Switch>
        {isLoggedIn ? (
            <>
                <Route exact path="/">
                    <Home userObj={userObj} />
                </Route>
                <Route exact path="/profile">
                    <Profile userObj={userObj} refreshUser={refreshUser} />
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
