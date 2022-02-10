import React from 'react'
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux"
import { deleteTodo, selectTodo, toggleAlert, updateTodo } from "../../redux/actions"

import "./styles.css"


// attribution: https://stackoverflow.com/a/43235785
function getHighlightedText(text, highlight) {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return <span> { parts.map((part, i) => 
      <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold', color: "var(--font-dark-color)" } : {} }>
          { part }
      </span>)
  } </span>;
}

export default function TodoCard(props) {
  const dispatch = useDispatch();
  const searchText = useSelector(state => state.searchText);

  const { todo } = props;
  const { id, content, isCompleted, isFavourite } = todo;

  let truncatedContent = content;
  if (content && content.length > 25) {
    truncatedContent = `${content.substring(0, Math.min(16, content.length))}...`
  }

  let text = () => {
    return getHighlightedText(truncatedContent, searchText)
  }

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
        {isCompleted ? <strike>{text()}</strike> : <div>{text()}</div>}
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
          dispatch(toggleAlert("Are you sure?", () => deleteTodo(id)))
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