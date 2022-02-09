import React from 'react'
import { useDispatch } from "react-redux"
import { markCompleted, markFavourite, deleteTodo, selectTodo } from "../../redux/actions"

import "./styles.css"

export default function TodoCard(props) {
  const dispatch = useDispatch();

  const { todo } = props;
  const { id, content, isCompleted, isFavourite, isDeleted } = todo;


  return (
    <li key={id} className="todo-card" onClick={() => dispatch(selectTodo(id))}>
      {isCompleted ? <strike>{content}</strike> : <div>{content}</div>}
      <div>
        <button onClick={() => dispatch(markCompleted(id))}>{isCompleted ? "T" : "F"}</button>
        <button onClick={() => dispatch(markFavourite(id))}>{isFavourite ? "T" : "F"}</button>
        <button onClick={() => dispatch(deleteTodo(id))}>delete</button>
      </div>
    </li>
  )
}
