import React from 'react'
import './App.css'
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
        {this.state.lists.map(list => (
          <List key={list.id} list={list} />
        ))}
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
