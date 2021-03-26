import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './list.css'
import Item from '../Item/Item'
import AddTask from '../AddTask'
import { getTasks, getListById, newTask, deleteTask, updateTask } from '../../fetchData'

function List () {
  const { id } = useParams()
  /*   const [{ list, tasks }, dispatch] = useReducer(reducer, {}, init)
  async function init () {
    console.log(id)
    const x = {
      tasks: await getTasks(id),
      list: await getListById(id)
    }
    console.log(x)
    return x
  }
    async function reducer (action) {
    switch (action.type) {
      case 'setTasks': return { tasks: action.tasks }
      case 'setList': return { list: action.list }
      default: return { tasks: [], list: {} }
    }
  }
  */
  const [tasks, setTasks] = useState([])
  const [list, setList] = useState({})
  useEffect(() => {
    (async function () {
      setList(await getListById(id))
      setTasks(await getTasks(id))
    })()
  }, [id])

  async function addTask (title) {
    const task = await newTask(title, list.id)
    console.log(task)
    setTasks([...tasks, task])
    // dispatch({ type: 'setTasks', tasks: [...tasks, task] })
  }

  async function removeTask ({ id, title }) {
    if (window.confirm(`Delete Task ${title}?`)) {
      const response = await deleteTask(id)
      setTasks(tasks.filter(task => task.id !== response.id))
      // dispatch({ type: 'setTasks', tasks: tasks.filter(task => task.id !== response.id) })
    }
  }

  async function updateTaskValue ({ id, key, value }) {
    try {
      console.log('updating', id, key, value)
      const updatedTask = await updateTask(id, key, value)
      console.log(updatedTask)
      setTasks(tasks.map(task => task.id === id ? updatedTask : task))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='list-container'>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <Item
              className={task.isComplete && 'hidden'}
              task={task}
              onDelete={removeTask}
              onSubmit={updateTaskValue}
            />
          </li>
        ))}
      </ul>
      <AddTask onAdd={addTask} />
    </div>
  )
}

export default List
