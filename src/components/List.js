import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Item from './Item/Item'
import AddTask from './AddTask'
import Footer from './Footer'
import ListHeader from './ListHeader'
import { getTasks, newTask, deleteTask, updateTask } from '../fetchData'

function List ({ clearCompleted, onUpdate }) {
  const { id } = useParams()
  const [tasks, setTasks] = useState([])
  const [completedCount, setCompletedCount] = useState(0)
  const [showCompleted, setShowCompleted] = useState(false)

  useEffect(() => {
    updateTasks()
  }, [])

  useEffect(() => {
    setCompletedCount(tasks.filter(task => task.iscomplete).length)
  }, [tasks])

  async function updateTasks () {
    console.log('fetching list')
    setTasks(await getTasks(id))
  }

  async function addTask (title) {
    const task = await newTask(title, id)
    console.log(task)
    setTasks([...tasks, task])
  }

  async function removeTask ({ id, title }) {
    if (window.confirm(`Delete Task ${title}?`)) {
      const response = await deleteTask(id)
      setTasks(tasks.filter(task => task.id !== response.id))
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
    <>
      <style>
        {`
          .list-container {
            width: 50%;
            min-width: 600px;
            margin: 10px auto;
          }
          li {
            all: unset;
          }
          ul {
            padding: 0;
          }
        `}
      </style>
      <ListHeader
        onClearCompleted={clearCompleted}
        onUpdate={onUpdate}
      />
      <main style={{ marginTop: '20px' }}>
        <div className='list-container'>
          <ul>
            {tasks.map(task => (
              <li key={task.id} className={task.iscomplete && !showCompleted ? 'hidden' : 'active'}>
                <Item
                  task={task}
                  onDelete={removeTask}
                  onSubmit={updateTaskValue}
                />
              </li>
            ))}
          </ul>
          <AddTask onAdd={addTask} />
        </div>
      </main>
      {completedCount > 0 &&
        <Footer
          doneCount={completedCount}
          onClick={() => { setShowCompleted(!showCompleted) }}
        />}
    </>
  )
}

export default List
