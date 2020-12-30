import React, { useEffect, useState } from "react";
import { getBooksByType } from "./book-search.service";
import sampleResponse from '../sampleResponse.json';
import {Book} from '../model/book';
import { isTemplateExpression } from "typescript";

const BookSearch = () => {
    const [bookType, updateBookType] = useState("");
    const [bookTypeToSearch, updateBookTypeToSearch] = useState("");
    const [allAvailableBooks, setAllAvailableBooks] = useState(sampleResponse as Book[]);
    const [wishList, setWishList] = useState([] as Book[]);
    const [filteredBook , setFilteredBook] = useState([] as Book[]);
   
    async function requestBooks() {
        if (bookTypeToSearch) {
            const allBooks = await getBooksByType(bookTypeToSearch);
            console.log(allBooks);
            //setAllAvailableBooks(allBooks);
        }
    }
    
    useEffect(() =>{
        setFilteredBook(allAvailableBooks); //for the first time all books will be filtered books
    },[allAvailableBooks]);

    // search and filter the list based on the search text
    useEffect(() =>{
        // add 500ms debounce
        const delayTimeOut = setTimeout(()=>{
            updateBookTypeToSearch(bookType); //update book to search from api

            setFilteredBook(allAvailableBooks.filter((item:Book) => {
                return item.title.toLowerCase().includes(bookType.toLocaleLowerCase())
            }));
        },500);
       return () =>clearTimeout(delayTimeOut);
    },[bookType]);

    // invoke api
    useEffect(() => {
        async function getAllBooks() {
            await requestBooks();
        }
        getAllBooks();
    }, [bookTypeToSearch]);
    
    const removeBook = (id:string) =>{
        const newbook = wishList.filter((book:Book) =>{
            return book.id !== id;
        })
        setWishList(newbook)
    }
    const addToWishlist = (book:Book) =>{
        setWishList([...wishList, book])
    }
    const isFiltered = (id:string)=>{
        return wishList.find((item:Book) =>item.id == id) ? true : false;
    }
    
    return (
            <>
                <div className="book--container">
                    <div className="search-params">
                        <div>
                            <form
                                onSubmit={(e) => {
                                    debugger;
                                    e.preventDefault();
                                   updateBookTypeToSearch(bookType)
                                }}
                            >
                                <input
                                    className="full-width"
                                    autoFocus
                                    name="gsearch"
                                    type="search"
                                    value={bookType}
                                    placeholder="Search for books to add to your reading list and press Enter"
                                    onChange={e => updateBookType(e.target.value)}
                                />
                            </form>
                            {!bookType && allAvailableBooks.length == 0 && (
                                <div className="empty">
                                    <p>
                                        Try searching for a topic, for example
                                        <a onClick={() => {
                                                updateBookType("Javascript");
                                            }}
                                        >
                                            {" "}
                                            "Javascript"
                                        </a>
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="book-container">
                            {
                                filteredBook.length > 0 && filteredBook.map((book:Book) =>{
                                // allAvailableBooks.length > 0 &&  allAvailableBooks.map((book:Book) =>{
                                    return(
                                        <section key={book.id}>
                                            <article className="book">
                                                <div className="book-wrapper">
                                                    <div className="image">
                                                        <img src={book.coverUrl}  />
                                                    </div>
                                                    <div className="book-details">
                                                            <h2>{book.title}</h2>
                                                            <span>By </span>
                                                            <span>{book.authors}, </span>
                                                            <span>{book.publisher}, </span>
                                                            <span>{book.publishedDate}</span>
                                                            <p>{book.description}</p>
                                                    </div>
                                                </div>
                                                <div className="add-book">
                                                    <button onClick={() => addToWishlist(book)} disabled={isFiltered(book.id)}>Add To Wishlist</button>
                                                </div>
                                            </article>
                                        </section>
                                    )
                                })
                            }
                    </div>
                    </div>
                    
                    <div className="sidebar">
                        <div className="count">My Reading Wishlist ({wishList.length})</div>
                        {wishList.length > 0 && <section className="items">
                            { wishList.length > 0 &&
                                wishList.map((book:any) =>{
                                    return(
                                        <article  key={book.id} className="cart-book">
                                            <span>{book.title}</span>
                                            <span className="remove" onClick={() =>removeBook(book.id)}></span>
                                        </article>
                                    )
                                })
                            }
                        </section>
                        }
                    </div>
                    
                </div>
            </>
    );
};

export default BookSearch;
