import React from "react";
import { Route, Redirect } from "react-router";
import { loadState } from "../redux/localStorage/token";
const ProtectedRoute = ({ component: Component,...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
          if(loadState()) return <Component {...props} />;
          else return <Redirect to={'/'} />
      }}
    />
  );
};

export default(ProtectedRoute)
