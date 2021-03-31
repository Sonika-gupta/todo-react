export default function EditMenu ({ onEscape, onCancel }) {
  return (
    <header>
      <style>
        {`header {
            background-color: green;
          }
          button {
            margin: auto 3px;
          }
          span {
            text-align: center;
            margin: auto;
          }`}
      </style>
      <span>Click a task list to select</span>
      <button title='Exit Edit Mode' style={{ backgroundColor: 'darkgreen' }} className='right small' onClick={onEscape}>
        <img src='/tick.svg' />
      </button>
      <button title='Cancel Selection' style={{ backgroundColor: 'inherit' }} onClick={onCancel}>Cancel</button>
    </header>
  )
}
