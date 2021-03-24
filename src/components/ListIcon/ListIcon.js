import './listIcon.css'
import { getTasksTitles } from '../../fetchData'
import { useState, useEffect } from 'react'

const ListIcon = ({ list }) => {
  const [taskTitles, setTaskTitles] = useState([])
  console.log(setTaskTitles)
  const [selected, setSelected] = useState(false)
  useEffect(() => {
    (async function () {
      setTaskTitles(await getTasksTitles(list.id))
    })()
  }, [])

  return (
    <div className='list' onContextMenu={() => setSelected(!selected)}>
      <div key={list.id} className='list-icon-container'>
        <div
          className='list-icon bordered' style={{ backgroundColor: list.color }} onClick={() => {
            setSelected(!selected)
          }}
        >
          {minimap()}
        </div>
        <svg className={selected ? 'tick' : 'tick hidden'} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
          <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
        </svg>
        <div className='caption'>{list.name}</div>
        <div className='caption light'>{list.location}</div>
      </div>
    </div>
  )

  function minimap () {
    return taskTitles.length
      ? <span>{taskTitles.map(obj => obj.title).join('\n')}</span>
      : <span className='empty-list'>No Tasks</span>
  }
}

export default ListIcon
