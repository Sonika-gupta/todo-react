import './listIcon.css'
import { getTasksTitles } from '../../fetchData'
import { useState, useEffect } from 'react'

const ListIcon = ({ list }) => {
  const [taskTitles, setTaskTitles] = useState([])
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
        <img className={selected ? 'tick' : 'tick hidden'} src='/tick.svg' alt='tick' />
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
