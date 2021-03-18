import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import ListIcon from './components/ListIcon/ListIcon'
import List from './components/List/List'
import Nav from './components/Nav/Nav'
import { getLists, deleteLists } from './fetchData'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lists: [],
      selectedLists: new Set()
    }
    this.appendNewListIcon = this.appendNewListIcon.bind(this)
    this.handleDeleteList = this.handleDeleteList.bind(this)
    this.handleRightCLick = this.handleRightCLick.bind(this)
    // this.handleIconClick = this.handleIconClick.bind(this)
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
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <ListIcon
                      list={list}
                      selected={this.state.selectedLists.has(list.id)}
                      onClick={this.handleRightCLick}
                    />
                  </Link>
                ))}
              </main>
              <footer>
                <div id='contextMenu'>
                  <button style={{ backgroundColor: 'white' }} disabled>Rename</button>
                  <button
                    style={{
                      backgroundColor: 'rgb(199,22,43)',
                      color: 'white',
                      float: 'right'
                    }}
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
    this.state.selectedLists.has(id)
      ? this.state.selectedLists.delete(id)
      : this.state.selectedLists.add(id)

    console.log(this.state.selectedLists)
  }

  async handleDeleteList () {
    const deletedLists = await deleteLists(this.state.selectedLists)
    this.removeListIcon(deletedLists.map(list => list.id))
  }

  async componentDidMount () {
    this.setState({
      lists: await getLists()
    })
  }
}

export default App
