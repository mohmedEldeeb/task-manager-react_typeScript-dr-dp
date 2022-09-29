import React, { FC } from 'react'
import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../models/models-type'
import SingleTodo from './SingleTodo'
import "./styles.css"
type TodoListProps ={
    todos: Array<Todo>;
    setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
    setCompletedTodos?: React.Dispatch<React.SetStateAction<Array<Todo>>>;
    CompletedTodos?: Array<Todo>;
}
const TodoList:FC<TodoListProps> = ({todos ,setTodos,CompletedTodos,setCompletedTodos}) => {

  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
          ref={provided.innerRef}
            {...provided.droppableProps}>
            <span className="todos__heading">Active Tasks</span>
            {todos?.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todos={todos}
                  todo={todo}
                  key={todo.id}
                  setTodos={setTodos}
                />
              ))}
              {provided.placeholder}
          </div>
        )}
      </Droppable>
        
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div className={`todos  ${
            snapshot.isDraggingOver ? "dragcomplete" : "remove"
          }`}
          ref={provided.innerRef}
          {...provided.droppableProps}>
            <span className="todos__heading">Active Tasks</span>
            {CompletedTodos?.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todos={todos}
                  todo={todo}
                  key={todo.id}
                  setTodos={setTodos}
                />
              ))}
              {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default TodoList