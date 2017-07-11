import React from "react";
import { Route, Switch } from "react-router-dom";
import { array, object, func } from 'prop-types';
import { connect, Provider } from "react-redux";
import { tryGettingRoot } from "./actionCreators";
import store from "./store";
import Todo from "./Todo";

const on404 = () => <h1>404</h1>;

class App extends React.Component {
  componentDidMount() {
    if (!this.props.root) {
      this.props.tryRoot();
    }
  }
  renderExactTodo = props => (
    <Todo
      todo={this.props.todo[props.match.id]}
      {...props}
    />
  );
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Switch>
            <Route
              exact
              path="/"
              component={() => <Todo todo={this.props.root} />}
            />
            <Route
              path="/:id"
              component={props => this.renderExactTodo(props)}
            />
            <Route component={on404} />
          </Switch>
        </div>
      </Provider>
    );
  }
}

App.propTypes = {
  root: object.isRequired,
  todo: array.isRequired,
  tryRoot: func.isRequired
}

const mapStateToProps = (state) => ({
  root: state.root,
  todo: state.todo
});

const mapDispatchToProps = (dispatch) => ({
  tryRoot() {
    dispatch(tryGettingRoot());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
