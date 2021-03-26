import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'
import { newList } from '../../fetchData'

function Header (props) {
  return (
    <header>
      <button onClick={() => handleNewList(props.newListHandler)} style={{ borderRadius: '4px' }}>New List</button>
      <nav id='main'>
        <Link to='/'>
          <button style={{ borderRadius: '4px 0 0 4px', backgroundColor: 'black' }}>Lists</button>
        </Link>
        <Link to='/scheduled'>
          <button>Scheduled<span id='scheduledCount' /></button>
        </Link>
        <Link to='/today '>
          <button style={{ borderRadius: '0 4px 4px 0' }}>Today<span id='todayCount' /></button>
        </Link>
      </nav>
      <button id='selectButton' className='right small'>
        <img src='/tick.svg' alt='tick' />
      </button>
      <button id='clearCompletedButton' className='right small' />
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
