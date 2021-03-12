import React from 'react'

class List extends React.Component {
  render () {
    console.log('List Rendered', this.props.list)
    return (
      <div className='list'> {this.props.list.name}
        <ul> {this.props.list.tasks} </ul>
      </div>
    )
  }
}

export default List
