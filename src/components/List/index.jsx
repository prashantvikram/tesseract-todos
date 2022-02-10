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

  const search = (e) => {
    dispatch(getTodos(e.target.value, page))
  }

  useEffect(() => {
    dispatch(getTodos())
  }, [dispatch])


  if ((!todos || todos.length === 0) && searchText === "") {
    return <div>No Todos</div>
  }

  return (
    <div style={{ position: "relative" }}>
      <div className='search-container'>
        <span className="material-icons-round search-icon">search</span>
        <input value={searchText} onChange={(e) => search(e)} className="search" placeholder='search todos' />
      </div>
      <ul ref={listRef} className='todo-list' onScroll={(e) => paginate(e)}>
        {todos.map(todo => <TodoCard key={todo.id} todo={todo}/>)}
      </ul>
    </div>
  )
}
