import React from 'react';
import './styles/App.scss';
import BookSearch from './book-search/BookSearch';

function App() {
  return (
      <div>
        <header className="header">
          <div className="header--content">
            <h1>My Reading Wishlist</h1>
          </div>
        </header>
        <main>
          <BookSearch/>
        </main>
      </div>
  );
}

export default App;
