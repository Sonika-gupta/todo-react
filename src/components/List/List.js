import React from 'react'
import './list.css'
import Item from '../Item/Item'
import { getTasks, getListById } from '../../fetchData'

class List extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      list: {},
      tasks: []
    }
  }

  render () {
    return (
      <ul>
        <style>{`body { background-color: ${this.state.list.color} }`}</style>
        {this.state.tasks.map(task => (
          <li key={task.id}>
            <Item task={task} />
          </li>
        ))}
      </ul>
    )
  }

  async componentDidMount () {
    const id = this.props.match.params.id
    this.setState({ list: await getListById(id) })
    this.setState({ tasks: await getTasks(id) })
    // document.body.style.backgroundColor = this.state.list.color
  }

  minimap () {
    return this.state.tasks.length
      ? <span>{this.state.tasks.map(obj => obj.title).join('\n')}</span>
      : <span className='empty-list'>No Tasks</span>
  }
}

export default List
