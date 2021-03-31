export default function Footer ({ doneCount, onClick }) {
  return (
    <footer>
      <style>
        {`
          footer {
            position: fixed;
            bottom: 0;
            background-color: ghostwhite;
            height: 50px;
            width: 100%;
          }
          footer > div {
            margin: auto;
            height: 100%;
            max-width: 550px;
          }
          footer button {
            margin: 10px auto;
            background-color: transparent;
            border: none;
            width: 100%;
          }
          footer button:hover {
            background-color: white;
            border: solid 1px grey;
            border-radius: 4px;
          }
        `}
      </style>
      <div>
        {/* TODO: vertically align icon and text */}
        <button className='light' onClick={onClick}>
          <img src='/zoom.svg' style={{ filter: 'opacity(0.5)' }} />
          <span>Done ({doneCount})</span>
        </button>
      </div>
    </footer>
  )
}
