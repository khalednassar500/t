import { useState } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from '../APIs/BooksAPI';
import Shelf from './Shelf';

let timer;

const compareData = (userBooks, queryBooks) => {
  const UB = [...userBooks];
  const QB = [...queryBooks];

  const shelfs = [];
  const ids = [];

  for (let i of UB) {
    shelfs.push(i.shelf);
    ids.push(i.id);
  }

  for (let b of QB) {
    if (ids.includes(b.id)) {
      b.shelf = shelfs[ids.indexOf(b.id)];
    }else {
      b.shelf = 'none';
    }
  }
  return QB;
}

// ----------------------------------------------------------------------
const AddBooks = ({books, onUpdateShelf}) => {  // Functional Component
  /*  In this component, the user can search for books 
      and the search result will be displayed on the page */

  const [query, setQuery] = useState('');
  const [queryResult, setQueryResult] = useState([]);

  /*  This block of code will make the request wait for 3 seconds
    after the user has finished typing and then it will create the request
    " to avoid unnecessary requests " */
  const searchForBooks = (query) => {
    const search = async () => {
      const data = await BooksAPI.search(query.trim());
      if (data.error) {
        setQueryResult([]);
      }else {
        setQueryResult(compareData(books, data));
      }
    }
    search()    
  }

  const setTimer = (query) => {
    clearInterval(timer);
    timer = setTimeout(() => searchForBooks(query), 3000);
  }

  const onUpdateQuery = (e) => {
    setQuery(e.target.value);
    if (e.target.value) {
      setTimer(e.target.value);
    }else {
      setQueryResult([]);
    }
  }

  return (
    <div>
      <div className="search-page-top">
        <Link to='/' className="link">⬅</Link>
        <input 
          type='search' 
          placeholder="Search . . ." 
          value={query}
          onChange={onUpdateQuery}
        />
      </div>

      <Shelf 
          title='Search result'
          shelf="none"
          books={queryResult}
          onUpdateShelf={onUpdateShelf}
      />
    </div>
  )
}

export default AddBooks;