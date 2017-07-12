import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'styled-components';
import { tryGettingRoot, getTodoTree } from './actionCreators';
import Todo from './Todo';


class TodoList extends React.Component {
  constructor(props, context) {
    super(props, context);
    console.log("TodoList props:");
    console.log(props);
  }
  componentDidMount() {
    if(this.props.target) {
      this.props.getExactRoot(this.props.target)
    } else if (!this.props.root) {
      this.props.tryRoot();
    }
  }
  render() {
    let root
    if(this.props.target) {
      // todo: refactor this shit
      root = <Todo url={`${this.props.match.url}`} ctx={this.props.root}/>
    }
    else if(this.props.root) {
      root = <Todo url={`${this.props.match.url}${this.props.root.id}`} ctx={this.props.root} />
    } else {
      root = <p>Loading</p>
    }
    return (
      <div className="todo-list">
        {root}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    root: state.todos.root ? state.todos.root : null,
    todo: state.todos.todo ? state.todos.todo : null
  };
};

const mapDispatchToProps = (dispatch) => ({
  tryRoot() {
    dispatch(tryGettingRoot());
  },
  getExactRoot(id) {
    dispatch(getTodoTree(id))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
