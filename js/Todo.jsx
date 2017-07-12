import React from "react";
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import {array, func, number, object} from "prop-types";
import styled from 'styled-components';

const Wrapper = styled(Link)`
  text-decoration: none;
  color: black;
`;


class Todo extends React.Component {
  constructor(props) {
    console.log("FIRED");
    console.log(props)
    super(props);
  }
  renderChildrenTodos = () => {
    console.log("fired inside: ")
    console.log(this.props.ctx);
    return this.props.ctxChildren.map(child => {
      return <li key={`${child.id}`}>
        <Wrapper to={`${this.props.url}/${child.id}`}>
          <TodoContainer url={`${this.props.url}/${child.id}`} ctx={child} visible={false}/>
        </Wrapper>
      </li>
    });
  };
  render() {
    let ctxData;
    if(this.props.ctx) {
      ctxData =
        <div className="todo">
          <h3>{this.props.ctx.content}</h3>
          <ul>{this.renderChildrenTodos()}</ul>
        </div>
    } else {
      ctxData = <div className='todo'><p>Loading</p></div>
    }
    return (
      <div>{ctxData}</div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const ctxChildren = ownProps.ctx && ownProps.ctx.todos.length ? ownProps.ctx.todos.map(id => state.todos.todo[id]) : [];
  return {
    ctxChildren
  };
};

const mapDispatchToProps = (dispatch) => ({

});

const TodoContainer = connect(mapStateToProps, mapDispatchToProps)(Todo);

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
