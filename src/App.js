import './App.css';
import logo from './images/2702134.png';
import Shelf from './components/Shelf';
import * as BooksAPI from './APIs/BooksAPI';
import {useEffect, useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import { Link } from 'react-router-dom';
import AddBooks from './components/AddBooks';

function App() {  // Functional Component
  const [userBooks, setUserBooks] = useState([]);
  
  useEffect(() => {
    const getUserBooks = async () => {
      const books = await BooksAPI.getAll();
      setUserBooks(books);
    }

    getUserBooks();
  }, [])
  
  const updateUserBooks = (book, shelf) => {
    const filterBooks = userBooks.filter((b) => b.id !== book.id);
    
    if (shelf === 'none') {
      setUserBooks(filterBooks);
    }else {
      book.shelf = shelf;
      setUserBooks([...filterBooks, book]);
    }
    
    BooksAPI.update(book, shelf)
  }

  return (
    <Routes>
        <Route 
          exact
          path='/'
          element={
            <div className="App">
              <header className='main-header'>
                <div className='logo'>
                  <img src={logo} alt='books logo' className='logo-t1'/>
                  <img src={logo} alt='books logo' className='logo-t2'/>
                  <p>My Reads</p>
                </div>
              </header>

              <main className='shelves-container'>
                <Shelf 
                  title='Currently Reading'
                  shelf="currentlyReading"
                  books={userBooks}
                  onUpdateShelf={updateUserBooks}
                />
                <Shelf 
                  title='Want to Read'
                  shelf="wantToRead"
                  books={userBooks}
                  onUpdateShelf={updateUserBooks}
                />
                <Shelf 
                  title='Read'
                  shelf="read"
                  books={userBooks}
                  onUpdateShelf={updateUserBooks}
                />

                <Link to='/search' className='link add'> + </Link>
              </main>
            </div>
          }
        />
        
        <Route
          path='/search'
          element={
            <AddBooks 
              books={userBooks}
              onUpdateShelf={updateUserBooks}
            />
          }
        />
    </Routes>
  );
}

export default App;
