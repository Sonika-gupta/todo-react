import React from 'react'
import './list.css'
import Item from '../Item/Item'
import { getTasks } from '../../fetchData'

class List extends React.Component {
  constructor () {
    super()
    this.state = {
      tasks: []
    }
  }

  render () {
    return (
      <ul>
        {this.state.tasks.map(task => (
          <li key={`${task.id}`}>
            <Item />
          </li>
        ))}
      </ul>
    )
  }

  async componentDidMount () {
    this.setState({ tasks: await getTasks(this.props.list.id) })
  }

  minimap () {
    return this.state.tasks.length
      ? <span>{this.state.tasks.map(obj => obj.title).join('\n')}</span>
      : <span className='empty-list'>No Tasks</span>
  }
}

export default List
