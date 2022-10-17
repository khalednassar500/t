import SelectShelf from "./SelectShelf";

const Shelf = ({ title, shelf, books, onUpdateShelf }) => {  // Functional Component

  const filterBooks = 
    shelf === 'none' ? books :
    books.filter((b) => (
      b.shelf === shelf || !b.hasOwnProperty('shelf')
    ));

  return (
    <div className='shelf'>
      <h2 className="shelf-title">{title}</h2>
      <ul className="books-area">
        {
          filterBooks.map((book) => (
            <li key={book.id} className='book'>
              <div>
                <img src={`${book.imageLinks.smallThumbnail}`} alt={book.title} />
                <p className="book-title">{book.title}</p>
                <p className="book-author">{book.authors ? book.authors[0]:'anonymous'}</p>
              </div>
              
              <SelectShelf 
                book={book}
                onUpdateShlef={onUpdateShelf}
              />
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Shelf;