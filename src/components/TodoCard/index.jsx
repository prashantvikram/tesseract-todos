import React from 'react'
import PropTypes from "prop-types";
import { useDispatch } from "react-redux"
import { deleteTodo, selectTodo, toggleAlert, updateTodo } from "../../redux/actions"

import "./styles.css"

export default function TodoCard(props) {
  const dispatch = useDispatch();

  const { todo } = props;
  const { id, content, isCompleted, isFavourite } = todo;

  const truncatedContent = content;
  if (content && content.length > 16) `${content.substring(0, Math.min(16, content.length))}...`

  return (
    <li key={id} className="todo-card" onClick={() => dispatch(selectTodo(id))}>
      <div className='flex-center'>
        <button onClick={(e) => {
          e.stopPropagation();
          const clonedTodo = { ...todo};
          clonedTodo.isCompleted = !isCompleted;
          dispatch(updateTodo(clonedTodo))
        }}>
          <span className="material-icons-round icon-button">
            {isCompleted ? "check_circle" : "radio_button_unchecked"}
          </span>
        </button>
        {isCompleted ? <strike>{truncatedContent}</strike> : <div>{truncatedContent}</div>}
      </div>
      <div className='flex-center'>
        <button onClick={(e) => {
          e.stopPropagation();
          const clonedTodo = { ...todo};
          clonedTodo.isFavourite = !isFavourite;
          dispatch(updateTodo(clonedTodo))
        }}>
          <span className="material-icons-round icon-button">
            {isFavourite? "star" : "star_border"}
          </span>
        </button>
        <button onClick={(e) => {
          e.stopPropagation()
          dispatch(toggleAlert("Are you sure?", deleteTodo(id)))
        }}>
          <span className="material-icons-round icon-button">
            delete_outline
          </span>
        </button>
      </div>
    </li>
  )
}

TodoCard.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.string,
    isCompleted: PropTypes.bool,
    isFavourite: PropTypes.bool,
  }).isRequired
}


// background-color: #B7B7A4;
//     color: #6B705C;