import { schema } from "normalizr";

const todo = new schema.Entity("todo");
const todos = new schema.Array(todo);
todo.define({ todos });
const todoSchema = new schema.Entity("root", { todos });

export default todoSchema;
