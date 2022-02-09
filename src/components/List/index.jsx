import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTodos, changePage } from '../../redux/actions';
import TodoCard from '../TodoCard';

import "./styles.css"

export default function List() {
  const dispatch = useDispatch();
  const paginatedTodos = useSelector(state => state.paginatedTodos);
  const totalPages = useSelector(state => state.totalPages);
  const currentPage = useSelector(state => state.currentPage);
  
  const paginate = (e) => {
    console.log(e)
  }

  useEffect(() => {
    dispatch(getTodos())
  }, [dispatch])


  if (!paginatedTodos || paginatedTodos.length === 0) {
    return <div>No todos</div>
  }

  console.log(totalPages)

  return (
    <>
      <ul className='todo-list' onScroll={(e) => paginate(e)}>
        {paginatedTodos.map(todo => <TodoCard key={todo.id} todo={todo}/>)}
      </ul>
      {/* {totalPages && parseInt(totalPages, 10) > 1 ? <div><button onClick={() => dispatch(changePage(currentPage - 1))}>prev</button>{currentPage} / {totalPages}<button onClick={() => dispatch(changePage(currentPage + 1))}>next</button></div> : null} */}
    </>
  )
}
