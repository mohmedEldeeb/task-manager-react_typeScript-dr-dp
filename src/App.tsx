import React, { useState } from 'react';
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import InpoutFiled from './components/InpoutFiled';
import TodoList from './components/TodoList';
import { Todo } from './models/models-type';

import './App.css';

function App() {

  const [ todo , setTodo ]=useState<string>("")
  const [ todos , setTodos ]=useState<Todo[]>([])
  const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

  const handelSubmit=(e:React.FormEvent)=>{
    e.preventDefault()
    // let t =11
    setTodos([...todos , {id:Math.random(),isDone:false,todo}])
    // console.log([...todos , {id:new Date,isDone:false,todo}])
  }

const onDragEnd = (result: DropResult) => {
  console.log("hi",result)
  const { destination, source } = result;

  console.log(result);

  if (!destination) {
    return;
  }

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  let add;
  let active = todos;
  let complete = CompletedTodos;
  // Source Logic
  if (source.droppableId === "TodosList") {
    add = active[source.index];
    active.splice(source.index, 1);
  } else {
    add = complete[source.index];
    complete.splice(source.index, 1);
  }

  // Destination Logic
  if (destination.droppableId === "TodosList") {
    active.splice(destination.index, 0, add);
  } else {
    complete.splice(destination.index, 0, add);
  }

  setCompletedTodos(complete);
  setTodos(active);
};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className='heading' >Taskify</span>
        <InpoutFiled handelSubmit={handelSubmit} setTodo={setTodo} todo={todo}/>
        <TodoList todos={todos} setTodos={setTodos} CompletedTodos={CompletedTodos} setCompletedTodos={setCompletedTodos} />
      </div>
    </DragDropContext>
    
  );
}

export default App;
