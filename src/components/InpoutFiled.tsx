import React from 'react'
import "./styles.css"

type InpoutFiledProps ={
    todo:string,
    setTodo:React.Dispatch<React.SetStateAction<string>>,
    handelSubmit:(e:React.FormEvent)=>void
}
const InpoutFiled : React.FC<InpoutFiledProps> =({todo , setTodo ,handelSubmit})=> {

    // const handelTask=(e:React.FormEvent)=>{
    //     e.preventDefault();
    //     handelSubmit()
    //     console.log("hi Task")
    // }
  return (
    <form className='input' onSubmit={handelSubmit} >
        <input type="text"
            placeholder='entar task'
            className='input__box'
            value={todo}
            onChange={(e)=>{
                setTodo(e.target.value)
            }}
        />
        <button  type='submit' className='input__submit'>Go </button>
    </form>
  )
}
export default InpoutFiled