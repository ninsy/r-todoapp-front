import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect, Provider } from "react-redux";
import { tryGettingRoot } from "actionCreators";
import store from "./store";
import Todo from "./Todo";

const on404 = () => <h1>404</h1>;

class App extends React.Component {
  componentDidMount() {
    if (!this.props.todosRoot) {
    }
  }
  getExactTodo = (todoTargetId, currentTodoPtr) => {
    if (todoTargetId === currentTodoPtr.id) {
      return currentTodoPtr;
    } else {
      for (let i = 0; i < currentTodoPtr.todos.length; i += 1) {
        const match = this.getExactTodo(todoTargetId, currentTodoPtr.todos[i]);
        if (match) return match;
      }
    }
  };
  renderExactTodo = props => (
    <Todo
      todo={this.getExactTodo(props.match.params.id, this.props.todosRoot)}
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
              component={() => <Todo todo={this.props.todosRoot} />}
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

const mapStateToProps = (state, ownProps) => {};

const mapDispatchToProps = (dispatch, ownProps) => ({
  tryRoot() {
    dispatch(tryGettingRoot());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
