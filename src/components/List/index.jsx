import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTodos } from '../../redux/actions';
import TodoCard from '../TodoCard';

import "./styles.css"

export default function List() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  const paginate = (e) => {
    console.log(e)
  }

  useEffect(() => {
    dispatch(getTodos())
  }, [dispatch])


  if (!todos || todos.length === 0) {
    return null
  }

  return (
    <>
      <ul className='todo-list' onScroll={(e) => paginate(e)}>
        {todos.map(todo => <TodoCard key={todo.id} todo={todo}/>)}
      </ul>
    </>
  )
}
