import { useState } from 'react'
import './item.css'

const priorityBorder = {
  none: 'solid 1px #e0e0e0',
  low: 'solid 5px #3465a4',
  medium: 'solid 5px #f57900',
  high: 'solid 5px #cc0000'
}

const Item = ({ task, onDelete, onSubmit }) => {
  const [expand, setExpand] = useState(false)
  const setDeadline = (value) => {
    task.date = value
  }
  function handleFormChange (target) {
    console.log(target.name, target.value)
    onSubmit({
      id: task.id,
      key: target.name,
      value: target.name === 'isComplete' ? target.checked : target.value
    })
  }
  return (
    <form
      id={`task${task.id}`}
      style={{ borderLeft: priorityBorder[task.priority] }}
      className='spaced bordered task-container'
      // TODO: Replace event onChange with something else for text input
      onChange={(e) => handleFormChange(e.target)}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className='title-bar spaced' onClick={() => setExpand(!expand)}>
        <div className='icon'>
          <img src='/menu.svg' alt='menu-icon' />
        </div>
        <input className='icon' type='checkbox' name='isComplete' defaultChecked={task.iscomplete} onClick={(e) => e.stopPropagation()} />
        <input className='text' name='title' defaultValue={task.title} style={{ textDecoration: task.iscomplete && 'line-through' }} />
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
              <option value='none'> None </option>
              <option value='low'> Low </option>
              <option value='medium'> Medium </option>
              <option value='high'> High </option>
            </select>
          </fieldset>
          <button type='button' className='deleteButton bordered' onClick={() => onDelete(task)}>Delete</button>
        </div>}
    </form>
  )
}
export default Item
