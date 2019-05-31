import React, { Component } from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import { configureApi } from "./api/index";
import "./App.css";

import IndexScene from "./scene/IndexPageScene/index.jsx";
import MethodsScene from "./scene/method/MethodsPageScene/index.jsx";
import MethodPage from "./scene/method/MethodPageScene/index.jsx";
import NewMethodPage from "./scene/method/NewMethodPageScene/index.jsx";
import FieldsPage from "./scene/field/FieldsPageScene/index.jsx";
import NewFieldPage from "./scene/field/NewFieldPageScene/index.jsx";
import LoginPageScene from "./scene/LoginPageScene/index.jsx";

export const api = configureApi();

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Switch onUpdate={() => window.scrollTo(0, 0)}>
            <Route exact path="/" component={IndexScene} />
            <Route exact path="/methods" component={MethodsScene} />
            <Route exact path="/methods/new" component={NewMethodPage} />
            <Route exact path="/methods/:id" component={MethodPage} />
            <Route exact path="/fields" component={FieldsPage} />
            <Route exact path="/fields/new" component={NewFieldPage} />
            <Route exact path="/auth/login" component={LoginPageScene} />
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
