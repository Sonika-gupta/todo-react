import React from 'react'
import './item.css'

class Item extends React.Component {
  render () {
    return (
    // <header className='App-header' />
      <form
        id={`task${this.props.id}`}
        className='spaced bordered task-container'
        onChange={(e) => this.renderTask(e.target, this.props)}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className='title-bar spaced' onClick={this.handleExpand}>
          <div className='icon'>
            <img className='small' src='./images/menu.png' />
          </div>
          <input className='icon' type='checkbox' name='isComplete' onChange={this.handleCheckTask} onClick={(e) => e.stopPropagation()} />
          <input className='text' name='title' value={this.props.title} />
          <span className='detail light' name='date' />
          <div className='icon expand' name='expand'>
            <i className='fa fa-sort-down' />
          </div>
        </div>
        <div className='panel'>
          <fieldset className='notes'>
            <legend>Notes</legend>
            <textarea className='spaced bordered' name='notes' />
          </fieldset>
          <fieldset className='deadline'>
            <legend>Due Date</legend>
            <div className='date-menu bordered'>
              <input type='button' style={{ borderRadius: '4px 0 0 4px' }} value='today' onClick={(e) => this.setDeadline(e.target, this.props)} />
              <input type='button' value='tomorrow' onClick={(e) => this.setDeadline(e.target, this.props)} />
              <input type='date' style={{ borderRadius: '0 4px 4px 0' }} name='deadline' />
            </div>
          </fieldset>
          <fieldset className='priority'>
            <legend>Priority</legend>
            <select className='bordered spaced' name='priority'>
              <option value='none'> None </option>
              <option value='low'> Low </option>
              <option value='medium'> Medium </option>
              <option value='high'> High </option>
            </select>
          </fieldset>
          <button type='button' id={this.props.id} className='deleteButton bordered'>Delete</button>
        </div>
      </form>
    )
  }
}
export default Item
