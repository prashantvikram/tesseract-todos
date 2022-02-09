import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { useDispatch, useSelector } from 'react-redux';
import { addTodo, updateContent } from '../../redux/actions';

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
        dispatch(updateContent(currentTodo.id, input))
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
      setInput("")
    }
  }
  
  const onChange = e => {
    setInput(e.target.value)
  }

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <input value={input} onChange={(e) => onChange(e)} />
    </form>
  )
}
