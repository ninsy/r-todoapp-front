import React from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import TodoList from './TodoList';
import store from './store';

const on404 = () => <h1>404</h1>;

const App = () => (
  <Provider store={store}>
    <div className="app">
      <Switch>
        <Route
          exact
          path="/"
          component={TodoList}
        />
        <Route
          path="/:id"
          component={(props) => <TodoList target={props.match.params.id} {...props}/>}
        />
        <Route component={on404} />
      </Switch>
    </div>
  </Provider>
);

export default App;
