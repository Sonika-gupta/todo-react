import React from 'react'
import { Link } from 'react-router-dom'
import './nav.css'
import { newList } from '../../fetchData'

class Nav extends React.Component {
  constructor (props) {
    super(props)
    this.handleNewList = this.handleNewList.bind(this)
  }

  render () {
    return (
      <nav id='main'>
        <button onClick={this.handleNewList} style={{ borderRadius: '4px' }}>New List</button>
        <div>
          <button style={{ borderRadius: '4px 0 0 4px', backgroundColor: 'black' }}>Lists</button>
          <Link
            to='/scheduled'
            style={{ all: 'inherit' }}
          >
            <button>Scheduled
              <span id='scheduledCount' />
            </button>
          </Link>
          <Link
            to='/today '
            style={{ all: 'inherit' }}
          >
            <button style={{ borderRadius: '0 4px 4px 0' }}>Today
              <span id='todayCount' />
            </button>
          </Link>
        </div>
        <button id='selectButton' className='right small' />
        <button id='clearCompletedButton' className='right small' />
      </nav>
    )
  }

  async handleNewList () {
    console.log(this)
    const name = window.prompt('List Name')
    if (name) {
      try {
        const list = await newList(name)
        console.log(list)
        this.props.newListHandler(list)
      } catch (err) {
        console.log(err)
      }
    }
  }
}

export default Nav
