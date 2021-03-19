import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Container } from "@material-ui/core";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

import useStyles from "./styles";

function App() {
    return (
      <BrowserRouter>
        <Container maxwidth="lg">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/auth" component={Auth}></Route>

            </Switch>
        </Container>
      
      </BrowserRouter>
      
    );
}

export default App;
