import React from 'react'
import './listIcon.css'
import { getTasksTitles } from '../../fetchData'

class ListIcon extends React.Component {
  constructor () {
    super()
    this.state = {
      taskTitles: []
    }
  }

  render () {
    return (
      <div className='list'>
        <div key={this.props.list.id} className='list-icon-container'>
          <div className='list-icon bordered' style={{ backgroundColor: this.props.list.color }} onClick={this.handleIconClick}>
            {this.minimap()}
          </div>
          <svg className='tick hidden' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
            <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
          </svg>
          <div className='caption'>{this.props.list.name}</div>
          <div className='caption light'>{this.props.list.location}</div>
        </div>
      </div>
    )
  }

  async componentDidMount () {
    this.setState({ taskTitles: await getTasksTitles(this.props.list.id) })
  }

  minimap () {
    return this.state.taskTitles.length
      ? <span>{this.state.taskTitles.map(obj => obj.title).join('\n')}</span>
      : <span className='empty-list'>No Tasks</span>
  }
}

export default ListIcon
