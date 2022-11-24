import SelectShelf from "./SelectShelf";
import NoImage from '../images/no-image.jpg';

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
                <img src={book.hasOwnProperty('imageLinks') ? `${book.imageLinks.smallThumbnail}` : `${NoImage}`} alt={book.title} />
                <p className="book-title">{book.title}</p>
                <p className="book-author">
                  {book.authors ? 
                    book.authors.map((a) => <span key={a}>{a} <br /></span>)
                    :'anonymous'}
                </p>
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