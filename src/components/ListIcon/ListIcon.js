import './listIcon.css'
import { getTasksTitles } from '../../fetchData'
import { useState, useEffect } from 'react'

const ListIcon = ({ list, onRightClick, onClick, selected }) => {
  const [taskTitles, setTaskTitles] = useState([])
  useEffect(() => {
    (async function () {
      setTaskTitles(await getTasksTitles(list.id))
    })()
  }, [list])

  return (
    <div className='list-icon-container' onContextMenu={onRightClick} onClick={onClick}>
      <div className='list-icon bordered' style={{ backgroundColor: list.color }}>
        {minimap()}
        <img className={selected ? 'tick' : 'tick hidden'} src='/tick.svg' alt='tick' />
      </div>
      <div className='caption'>{list.name}</div>
      <div className='caption light'>{list.location}</div>
    </div>
  )

  function minimap () {
    return taskTitles.length
      ? <span>{taskTitles.map(obj => obj.title).join('\n')}</span>
      : <span className='empty-list'>No Tasks</span>
  }
}

export default ListIcon
