import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import ListIcon from './components/ListIcon/ListIcon'
import List from './components/List/List'
import Nav from './components/Nav/Nav'
import { getLists, deleteLists, updateList } from './fetchData'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lists: [],
      selectedLists: []
    }
    this.appendNewListIcon = this.appendNewListIcon.bind(this)
    this.handleDeleteList = this.handleDeleteList.bind(this)
    this.handleRenameList = this.handleRenameList.bind(this)
    this.handleRightCLick = this.handleRightCLick.bind(this)
  }

  render () {
    return (
      <div className='app'>
        <Router>
          <Switch>
            <Route path='/lists/:id' component={List} />
            <Route path='/' exact>
              <header>
                <Nav newListHandler={this.appendNewListIcon} />
              </header>
              <main>
                {this.state.lists.map(list => (
                  <Link
                    onContextMenu={(e) => {
                      e.preventDefault()
                      this.handleRightCLick(list.id)
                    }}
                    key={list.id}
                    to={`/lists/${list.id}`}
                    style={{ all: 'unset', color: 'inherit' }}
                  >
                    <ListIcon
                      list={list}
                      selected={this.state.selectedLists.indexOf(list.id) === -1}
                    />
                  </Link>
                ))}
              </main>
              <footer>
                <div id='contextMenu'>
                  <button
                    style={{ backgroundColor: 'white' }}
                    disabled={this.state.selectedLists.length !== 1}
                    onClick={this.handleRenameList}
                  >Rename
                  </button>
                  <button
                    className='deleteButton'
                    disabled={!this.state.selectedLists.length || this.state.selectedLists.indexOf(0) === -1}
                    onClick={this.handleDeleteList}
                  >Delete
                  </button>
                </div>
              </footer>
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }

  appendNewListIcon (newList) {
    console.log(newList)
    this.setState({ lists: [...this.state.lists, newList] })
  }

  removeListIcon (ids) {
    console.log(ids)
    const lists = this.state.lists.filter(list => !ids.includes(list.id))
    this.setState({ lists })
  }

  async handleRightCLick (id) {
    const selectedLists = this.state.selectedLists
    const index = selectedLists.indexOf(id)
    index === -1
      ? selectedLists.push(id)
      : selectedLists.splice(index)

    this.setState({ selectedLists })
  }

  async handleDeleteList () {
    const deletedLists = await deleteLists(this.state.selectedLists)
    this.removeListIcon(deletedLists.map(list => list.id))
  }

  async handleRenameList () {
    const newName = window.prompt('New List Name: ')
    if (newName) {
      const lists = this.state.lists
      const renamedList = await updateList(this.state.selectedLists[0], 'name', newName)
      this.setState({ lists: lists.map(list => list.id === renamedList.id ? renamedList : list) })
    }
  }

  async componentDidMount () {
    this.setState({
      lists: await getLists()
    })
  }
}

export default App
