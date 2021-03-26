import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getListById, updateList } from '../fetchData'

export default function ListHeader ({ onClearCompleted }) {
  const [list, setList] = useState({})
  const { id } = useParams()
  const history = useHistory()
  useEffect(() => {
    (async function () {
      setList(await getListById(id))
    })()
  }, [id])

  async function updateColor (event) {
    setList(await updateList(id, 'color', event.target.value))
  }

  return (
    <header style={{ padding: '3px' }}>
      <style>{`body { background-color: ${list.color} }`}</style>
      <button className='icon' style={{ borderRadius: '4px' }} onClick={() => history.goBack()}> &lt;</button>
      <div>
        <span className='caption'>{list.name}</span>
        <span className='caption light'>{list.location}</span>
      </div>
      <input type='color' className='right' value={list.color} onChange={updateColor} />
      <button className='icon' onClick={() => onClearCompleted(id)}>
        <img src='/menu.svg' alt='menu-icon' style={{ filter: 'invert(1)' }} />
      </button>
    </header>
  )
}
