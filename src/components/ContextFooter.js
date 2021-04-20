
function ContextFooter ({ selectedLists, onDelete, onRename }) {
  return (
    <footer>
      <div id='contextMenu'>
        <button
          style={{ backgroundColor: 'white' }}
          disabled={selectedLists.length !== 1}
          onClick={onRename}
        >Rename
        </button>
        <button
          className='deleteButton'
          disabled={!selectedLists.length || selectedLists.indexOf(0) !== -1}
          onClick={onDelete}
        >Delete
        </button>
      </div>
    </footer>
  )
}

export default ContextFooter
