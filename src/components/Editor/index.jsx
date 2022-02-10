import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { useDispatch, useSelector } from 'react-redux';
import { addTodo, selectTodo, updateTodo } from '../../redux/actions';

import "./styles.css"

export default function Editor() {
  const dispatch = useDispatch();
  const currentTodo = useSelector(state => state.currentTodo);

  const [input, setInput] = useState("")

  useEffect(() => {
    if (currentTodo) {
      setInput(currentTodo.content)
    }
  }, [currentTodo])
  

  const onSubmit = e => {
    e.preventDefault();
    if (input !== "") {
      if (currentTodo) {
        const clonedTodo = { ...currentTodo};
        clonedTodo.content = input;
        clonedTodo.updatedAt = Date.now(),
        dispatch(updateTodo(clonedTodo))
      } else {
        const todo = {
          id: uuidv4(),
          content: input,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          isCompleted: false,
          isFavourite: false,
          isDeleted: false
        }
        dispatch(addTodo(todo))
      }
      dispatch(selectTodo(null))
      setInput("")
    }
  }
  
  const onChange = e => {
    setInput(e.target.value)
  }

  return (
    <form onSubmit={(e) => onSubmit(e)} className="editor">
      <input value={input} onChange={(e) => onChange(e)} placeholder="Buy milk" autoFocus/>
    </form>
  )
}
