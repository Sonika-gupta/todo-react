import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './list.css'
import Item from '../Item/Item'
import AddTask from '../AddTask'
import { getTasks, getListById, newTask, deleteTask } from '../../fetchData'

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

  async function removeTask ({ id, title }) {
    if (window.confirm(`Delete Task ${title}?`)) {
      const response = await deleteTask(id)
      setTasks(tasks.filter(task => task.id !== response.id))
    }
  }

  return (
    <div className='list-container'>
      <ul>
        <style>{`body { background-color: ${list.color} }`}</style>
        {tasks.map(task => (
          <li key={task.id}>
            <Item className={task.isComplete && 'hidden'} task={task} onDelete={removeTask} />
          </li>
        ))}
      </ul>
      <AddTask onAdd={addTask} />
    </div>
  )
}

export default List
