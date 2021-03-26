import { useState } from 'react'
import './item.css'

const Item = ({ task, onDelete }) => {
  const [expand, setExpand] = useState(false)
  const handleCheckTask = () => {
    console.log('checktask')
  }
  const setDeadline = (value) => {
    task.date = value
  }
  function handleFormChange (event) {
    console.log(event.target.name, event.target.value)
  }
  return (
    <form
      id={`task${task.id}`}
      className='spaced bordered task-container'
      onChange={(e) => handleFormChange(e.target)}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className='title-bar spaced' onClick={() => setExpand(!expand)}>
        <div className='icon'>
          <svg width='12px' height='12px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' stroke='currentColor'>
            <path strokeWidth='1' d='M4 6h16M4 12h16M4 18h16' />
          </svg>
        </div>
        <input className='icon' type='checkbox' name='isComplete' onChange={handleCheckTask} onClick={(e) => e.stopPropagation()} />
        <input className='text' name='title' defaultValue={task.title} />
        <span className='detail light' name='date' />
        <div className='icon expand' name='expand'>
          <svg height='12px' width='12px' viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'>
            <path d='M98.9,184.7l1.8,2.1l136,156.5c4.6,5.3,11.5,8.6,19.2,8.6c7.7,0,14.6-3.4,19.2-8.6L411,187.1l2.3-2.6  c1.7-2.5,2.7-5.5,2.7-8.7c0-8.7-7.4-15.8-16.6-15.8v0H112.6v0c-9.2,0-16.6,7.1-16.6,15.8C96,179.1,97.1,182.2,98.9,184.7z' />
          </svg>
        </div>
      </div>
      {expand &&
        <div className='panel'>
          <fieldset className='notes'>
            <legend>Notes</legend>
            <textarea className='spaced bordered' name='notes' />
          </fieldset>
          <fieldset className='deadline'>
            <legend>Due Date</legend>
            <div className='date-menu bordered'>
              <input type='button' style={{ borderRadius: '4px 0 0 4px' }} defaultValue='today' onClick={(e) => setDeadline(e.target)} />
              <input type='button' defaultValue='tomorrow' onClick={(e) => setDeadline(e.target)} />
              <input type='date' style={{ borderRadius: '0 4px 4px 0' }} name='deadline' />
            </div>
          </fieldset>
          <fieldset className='priority'>
            <legend>Priority</legend>
            <select className='bordered spaced' name='priority'>
              <option defaultValue='none'> None </option>
              <option defaultValue='low'> Low </option>
              <option defaultValue='medium'> Medium </option>
              <option defaultValue='high'> High </option>
            </select>
          </fieldset>
          <button type='button' className='deleteButton bordered' onClick={() => onDelete(task)}>Delete</button>
        </div>}

    </form>
  )
}
export default Item
