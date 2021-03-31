import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import ListIcon from './components/ListIcon/ListIcon'
import List from './components/List'
import Header from './components/Header'
import EditMenu from './components/EditMenu'
import { getLists, deleteLists, updateList, clearCompletedTasks } from './fetchData'

const App = () => {
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
      if (e.key === 'Escape') escapeEditMode()
    })
  }, [])

  return (
    <div className='app'>
      <Router>
        <Switch>
          <Route path='/lists/:id'>
            <List onUpdate={(updatedList) => setLists(lists.map(list => list.id === updatedList.id ? updatedList : list))} />
          </Route>
          <Route path='/'>
            {editMode
              ? <EditMenu onEscape={escapeEditMode} onCancel={escapeEditMode} />
              : <Header
                  newListHandler={(newList) => setLists([...lists, newList])}
                  onClearCompleted={clearCompleted}
                  onSelect={() => setEditMode(true)}
                />}
            <main>
              <Route path='/' exact>
                {lists.map(list => (
                  <Link key={list.id} to={`/lists/${list.id}`}>
                    <ListIcon
                      list={list}
                      selected={selectedLists.indexOf(list.id) !== -1}
                      onRightClick={(e) => handleClick(e, list.id)}
                      onClick={(e) => editMode && handleClick(e, list.id)}
                    />
                  </Link>
                ))}
              </Route>
            </main>
            <footer>
              {editMode &&
                <div id='contextMenu'>
                  <button
                    style={{ backgroundColor: 'white' }}
                    disabled={selectedLists.length !== 1}
                    onClick={handleRenameList}
                  >Rename
                  </button>
                  <button
                    className='deleteButton'
                    disabled={!selectedLists.length || selectedLists.indexOf(0) !== -1}
                    onClick={handleDeleteList}
                  >Delete
                  </button>
                </div>}
            </footer>
          </Route>
        </Switch>
      </Router>
    </div>
  )

  function escapeEditMode () {
    setEditMode(false)
    setSelectedLists([])
  }

  function toggleSelection (id) {
    if (!editMode) setEditMode(true)
    const index = selectedLists.indexOf(id)
    index === -1
      ? setSelectedLists([...selectedLists, id])
      : setSelectedLists(selectedLists.filter(el => el !== id))
  }

  function handleClick (e, id) {
    console.log(id)
    e.preventDefault()
    toggleSelection(id)
    console.log(selectedLists)
  }

  async function clearCompleted (id) {
    console.log('clearing', id)
    if (window.confirm('Clear Completed Tasks?')) {
      await clearCompletedTasks(id)
    }
  }

  async function handleDeleteList () {
    if (window.confirm('Confirm delete Selected Lists ?')) {
      const deletedLists = await deleteLists(selectedLists)
      const ids = deletedLists.map(list => list.id)
      setLists(lists.filter(list => !ids.includes(list.id)))
    }
  }

  async function handleRenameList () {
    const newName = window.prompt('New List Name: ')
    if (newName) {
      const renamedList = await updateList(selectedLists[0], 'name', newName)
      setLists(lists.map(list => list.id === renamedList.id ? renamedList : list))
    }
  }
}

export default App
