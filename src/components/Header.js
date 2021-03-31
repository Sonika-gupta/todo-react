import { useState } from 'react'
import { Link } from 'react-router-dom'
import { newList } from '../fetchData'

function Header (props) {
  const [selectedTab, setSelectedTab] = useState(0)
  return (
    <header>
      <button
        onClick={() => handleNewList(props.newListHandler)}
        style={{ borderRadius: '4px' }}
      >New List
      </button>
      <nav id='main'>
        <Link to='/'>
          <button
            style={{
              borderRadius: '4px 0 0 4px',
              backgroundColor: selectedTab === 0 && 'black'
            }}
            onClick={() => setSelectedTab(0)}
          >Lists
          </button>
        </Link>
        <Link to='/scheduled'>
          <button
            style={{ backgroundColor: selectedTab === 1 && 'black' }}
            onClick={() => setSelectedTab(1)}
          >
            Scheduled<span id='scheduledCount' />
          </button>
        </Link>
        <Link to='/today '>
          <button
            style={{
              borderRadius: '0 4px 4px 0',
              backgroundColor: selectedTab === 2 && 'black'
            }}
            onClick={() => setSelectedTab(2)}
          >
            Today<span id='todayCount' />
          </button>
        </Link>
      </nav>
      <button id='selectButton' className='right icon' onClick={props.onSelect}>
        <img src='/tick.svg' alt='tick' style={{ filter: 'invert(1)' }} />
      </button>
      <button id='clearCompletedButton' className='right icon' onClick={() => props.onClearCompleted()}>
        <img src='/menu.svg' alt='menu-icon' style={{ filter: 'invert(1)' }} />
      </button>
    </header>
  )
}

async function handleNewList (newListHandler) {
  console.log(this)
  const name = window.prompt('List Name')
  if (name) {
    try {
      const list = await newList(name)
      console.log(list)
      newListHandler(list)
    } catch (err) {
      console.log(err)
    }
  }
}

export default Header
