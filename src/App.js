import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import ListIcon from './components/ListIcon/ListIcon'
import List from './components/List/List'
import { getLists } from './fetchData'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lists: []
    }
  }

  render () {
    return (
      <div className='app'>
        <Router>
          <Switch>
            <Route path='/lists/:id'><List /></Route>
          </Switch>
          {this.state.lists.map(list => (
            <Link key={list.id} to={`/lists/${list.id}`}>
              <ListIcon list={list} />
            </Link>
          ))}
        </Router>
      </div>
    )
  }

  async componentDidMount () {
    this.setState({
      lists: await getLists()
    })
  }
}

export default App
