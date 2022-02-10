import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../../redux/actions';
import TodoCard from '../TodoCard';

import "./styles.css"

export default function List() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const searchText = useSelector(state => state.searchText);
  const page = useSelector(state => state.page);
  const listRef = useRef();

  const paginate = () => {
    if (listRef && listRef.current) {
      const diff = listRef.current.scrollTop === (listRef.current.scrollHeight - listRef.current.offsetHeight)
      
      if (diff) {
        dispatch(getTodos(searchText, page + 1))
      }
    }
  }

  useEffect(() => {
    dispatch(getTodos())
  }, [dispatch])


  if (!todos || todos.length === 0) {
    return null
  }

  return (
    <div style={{ position: "relative" }}>
      <ul ref={listRef} className='todo-list' onScroll={(e) => paginate(e)}>
        {todos.map(todo => <TodoCard key={todo.id} todo={todo}/>)}
      </ul>
    </div>
  )
}
