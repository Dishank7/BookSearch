import React, { useState, useEffect } from 'react';

const MyBooks = () =>{

    const [bookshelf, setBookshelf] = useState([]);

    // Function to load books from local storage
    const loadBookshelf = () => {
      const savedBooks = JSON.parse(localStorage.getItem('bookshelf')) || [];
      setBookshelf(savedBooks);
    };
  
    // Load the bookshelf when the component mounts
    useEffect(() => {
      loadBookshelf();
    }, []);
    
    

    return(
        <>
    <div>
      <h1 style={{textAlign:"center"}}>My Bookshelf</h1>
      <div style={{ marginTop:"30px", display: "flex", flexWrap: "wrap", padding: "30px", justifyContent: "space-around", alignItems: "center", gap: "10px" }}>
        {bookshelf.map((book, index) => (
         <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "20px", width: "200px", height: "100px", border: "1px solid black", borderRadius: "10px" }}>
         <b>Title:{book.title}</b>
         <span>Edition count: {book.edition_count}</span>
     </div>
        ))}
      </div>
    </div>
        </>
    )
}

export default MyBooks