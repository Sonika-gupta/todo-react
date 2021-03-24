import { useState } from 'react'

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState('')
  const onSubmit = (e) => {
    e.preventDefault()
    if (!text) return
    onAdd(text)
    setText('')
  }

  return (
    <form className='spaced bordered' style={addTaskStyle} onSubmit={onSubmit}>
      <div className='icon'>
        <svg width='18' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
        </svg>
      </div>
      <input id='input-text' className='text' placeholder='New Task...' value={text} onChange={(e) => setText(e.target.value)} />
    </form>
  )
}

const addTaskStyle = {
  backgroundColor: 'white',
  display: 'flex',
  alignItems: 'center',
  height: '33px',
  padding: '5px 15px'
}

export default AddTask
