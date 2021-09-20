import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "./App.css";
import LoginScreen from "./Screens/LoginScreen/LoginScreen";
import SignUpScreen from "./Screens/SignUpScreen/SignUpScreen";
import HomeScreen from "./Screens/HomeScreen/HomeScreen";
import ProtectedRoute from './routes/ProtectedRoutes'
import { AnimatePresence } from "framer-motion";
import NotLoggedIn from "./Screens/NotFound/NotLoggedIn";
import ErrorScreen from "./Screens/NotFound/ErrorScreen";
function App() {
  let location = useLocation();
  return (
      <div style={{ overflowX: "hidden" }}>
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/" component={LoginScreen} />
            <Route path="/register" component={SignUpScreen} />
            <ProtectedRoute path="/home" component={HomeScreen} />
            <Route path="/usernotfound" component={NotLoggedIn} />
            <Route path="*" component={ErrorScreen} />
          </Switch>
        </AnimatePresence>
      </div>
  );
}

export default App;
