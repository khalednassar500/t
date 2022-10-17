import { useState } from "react";

const SelectShelf = ({ book, onUpdateShlef }) => {  // Functional Component
  const [ toggle, setToggle ] = useState(false);

  const updateToggle = () => setToggle(!toggle);

  const moveBook = (book, shelf) => {
    onUpdateShlef(book, shelf);
  }

  return (
    <div className="select-shelf-area">
      {toggle &&
        <div className="choice-shelf">
          <p> Move to ... </p>
          <button 
            className={book.shelf === 'currentlyReading' ? 'selected' : 'non-select'} 
            onClick={() => moveBook(book, 'currentlyReading')}
            >
            <span>{book.shelf === 'currentlyReading' && '✔'}</span> Currently Reading
          </button>
          <button 
            className={book.shelf === 'wantToRead' ? 'selected' : 'non-select'}  
            onClick={() => moveBook(book, 'wantToRead')}
            >
            <span>{book.shelf === 'wantToRead' && '✔'}</span> Want to Read
          </button>
          <button 
            className={book.shelf === 'read' ? 'selected' : 'non-select'}  
            onClick={() => moveBook(book, 'read')}
            >
            <span>{book.shelf === 'read' && '✔'}</span> Read
          </button>
          <button 
            className={book.shelf === 'none' ? 'selected' : 'non-select'}  
            onClick={() => moveBook(book, 'none')}
            >
            <span>{book.shelf === 'none' && '✔'}</span>None
          </button>
        </div>
      }
      <button className="move-to-button" onClick={updateToggle}>Move to</button>
    </div>
  )
}

export default SelectShelf;