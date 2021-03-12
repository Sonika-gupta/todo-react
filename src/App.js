import React from 'react'
import './App.css'
import List from './components/List/List'
import { getLists } from './fetch'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lists: []
    }
  }

  render () {
    return (
      <div className='App'>
        {this.state.lists}
      </div>
    )
  }

  async componentDidMount () {
    const lists = await getLists()
    this.setState({ lists: lists.map(list => <List key={list.id} list={list} />) })
    console.log(this.state.lists)
  }
}

export default App
