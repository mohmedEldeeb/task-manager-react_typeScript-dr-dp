import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../models/models-type';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from 'react-beautiful-dnd';


type SingleTodoType={
    index: number;
    todo: Todo;
    todos: Array<Todo>;
    setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  }


const  SingleTodo:React.FC<SingleTodoType>=({ index,todo,setTodos,todos})=> {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);
    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };
    const handleDone = (id: number) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
          )
        );
    };
    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(
          todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
        );
        setEdit(false);
      };
  return (
    <Draggable draggableId={todo.id.toString()} index={index} >
      {(provided, snapshot)=>(
        <form className="todos__single" 
        inlist={index}
        onSubmit={(e) => handleEdit(e, todo.id)}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        >
          {edit ? (
              <>
                  <input
                  value={editTodo}
                  onChange={(e) => setEditTodo(e.target.value)}
                  className="todos__single--text"
                  ref={inputRef}
                  />
                  {/* <button type='submit' >Go</button> */}
            </>
          )  : todo.isDone ? (
              <s className="todos__single--text">{todo.todo}</s>
          ) :(
              <span className="todos__single--text">{todo.todo}</span>
          )}
          <div>
              <span className="icon" 
              onClick={() => {
                  if (!edit && !todo.isDone) {
                    setEdit(!edit);
                  }
                }}
                > <AiFillEdit /></span>
              <span className="icon" onClick={() => handleDelete(todo.id)}>
                  <AiFillDelete />
              </span>
              <span className="icon" onClick={() => handleDone(todo.id)}>
                <MdDone />
              </span>
          </div>
        </form >
      )}
    </Draggable>
  )
}
export default SingleTodo