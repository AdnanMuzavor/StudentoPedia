import React from "react";
import HomeScreen from "../Screens/Home";
import RegisterScreen from "../Screens/Register";
import StudentScreen from "../Screens/Student";
import { Route } from "react-router-dom";
const Routing = () => {
  return (
    <>
      <Route exact path="/">
        <HomeScreen />
      </Route>
      <Route
        path="/getstudent/:id"
        render={(props) => <StudentScreen {...props} />}
      />
      <Route path="/register/:id" render={(props)=> <RegisterScreen {...props}/>}>
       
      </Route>
    </>
  );
};

export default Routing;
