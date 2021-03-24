import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './list.css'
import Item from '../Item/Item'
import AddTask from '../AddTask'
import { getTasks, getListById, newTask } from '../../fetchData'

function List () {
  const [tasks, setTasks] = useState([])
  const [list, setList] = useState({})
  const { id } = useParams()
  useEffect(() => {
    (async function () {
      setList(await getListById(id))
      setTasks(await getTasks(id))
    })()
  }, [id])
  console.log(id)

  async function addTask (title) {
    const task = await newTask(title, list.id)
    console.log(task)
    setTasks([...tasks, task])
  }

  return (
    <div className='list-container'>
      <ul>
        <style>{`body { background-color: ${list.color} }`}</style>
        {tasks.map(task => (
          <li key={task.id}>
            <Item task={task} />
          </li>
        ))}
      </ul>
      <AddTask onAdd={addTask} />
    </div>
  )
}

export default List
