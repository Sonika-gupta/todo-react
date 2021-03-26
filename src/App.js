import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import ListIcon from './components/ListIcon/ListIcon'
import List from './components/List/List'
import Header from './components/Header'
import ListHeader from './components/ListHeader'
import EditMenu from './components/EditMenu'
import { getLists, deleteLists, updateList, clearCompletedTasks } from './fetchData'

const App = (props) => {
  const [lists, setLists] = useState([])
  const [selectedLists, setSelectedLists] = useState([])
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    (async function () {
      setLists(await getLists())
    })()
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setEditMode(false)
      }
    })
  }, [])

  function appendNewListIcon (newList) {
    console.log(newList)
    setLists([...lists, newList])
  }

  return (
    <div className='app'>
      <Router>
        <Switch>
          <Route path='/lists/:id' exact>
            <ListHeader onClearCompleted={clearCompleted} />
            <main style={{ marginTop: '20px' }}>
              <List />
            </main>
          </Route>
          <Route path='/' exact>
            {editMode
              ? <EditMenu />
              : <Header newListHandler={appendNewListIcon} />}
            <main>
              {lists.map(list => (
                <Link
                  onContextMenu={(e) => {
                    e.preventDefault()
                    handleRightCLick(list.id)
                  }}
                  key={list.id}
                  to={`/lists/${list.id}`}
                  style={{ all: 'unset', color: 'inherit' }}
                >
                  <ListIcon
                    list={list}
                    selected={selectedLists.indexOf(list.id) === -1}
                  />
                </Link>
              ))}
            </main>
            <footer>
              <div id='contextMenu'>
                <button
                  style={{ backgroundColor: 'white' }}
                  disabled={selectedLists.length !== 1}
                  onClick={handleRenameList}
                >Rename
                </button>
                <button
                  className='deleteButton'
                  disabled={!selectedLists.length || selectedLists.indexOf(0) === -1}
                  onClick={handleDeleteList}
                >Delete
                </button>
              </div>
            </footer>
          </Route>
        </Switch>
      </Router>
    </div>
  )

  async function handleRightCLick (id) {
    setEditMode(true)
    const index = selectedLists.indexOf(id)
    index === -1
      ? selectedLists.push(id)
      : selectedLists.splice(index, 1)

    setSelectedLists(selectedLists)
  }

  async function handleDeleteList () {
    const deletedLists = await deleteLists(selectedLists)
    const ids = deletedLists.map(list => list.id)
    setLists(lists.filter(list => !ids.includes(list.id)))
  }

  async function handleRenameList () {
    const newName = window.prompt('New List Name: ')
    if (newName) {
      const renamedList = await updateList(selectedLists[0], 'name', newName)
      setLists(lists.map(list => list.id === renamedList.id ? renamedList : list))
    }
  }

  async function clearCompleted (id) {
    await clearCompletedTasks(id)
  }
}

export default App
