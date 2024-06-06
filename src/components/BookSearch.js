import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

const BookSearch = () => {
    const [query, setQuery] = useState(''); 
    const [results, setResults] = useState([]); 
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(''); 

    const navigate = useNavigate();

   
    const fetchBooks = async (searchQuery) => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`https://openlibrary.org/search.json?q=${searchQuery}&limit=10&page=1`);
            setResults(response.data.docs);
        } catch (err) {
            setError('Error fetching data');
        } finally {
            setLoading(false);
        }
    };

    
    useEffect(() => {
        fetchBooks('random'); 
    }, []);

    useEffect(() => {
        fetchBooks(query);
    }, [query]);

    const addToBookshelf = (book) => {
        const bookInfo = {
          title: book.title,
          edition_count: book.edition_count,
        };
    
        const savedBooks = JSON.parse(localStorage.getItem('bookshelf')) || [];
        localStorage.setItem('bookshelf', JSON.stringify([...savedBooks, bookInfo]));
        alert("Book has been added")
      };

    console.log(results)

    return (
        <>
            <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <h1 style={{ textAlign: "center" }}>Search By Book Name</h1>

                <input
                    type="text"
                    placeholder="Serach Books"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{
                        outline: "none",
                        // border: "1px solid black",
                        border:"none",
                        padding: "10px",
                        borderRadius: "10px",
                        width: "50%"
                    }} />

                <button style={{
                    position: "absolute",
                    right: "10px",
                    top:"0",
                    background: "lightgreen",
                    color: "black",
                    border: "none",
                    padding: "10px",
                    borderRadius: "10px",
                    cursor:"pointer"
                }}
                onClick={()=>navigate('/my-books')}> My BookSelf</button>
            </div>
            {loading ? (
                <p style={{ textAlign: "center" }}>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div style={{ marginTop:"30px", display: "flex", flexWrap: "wrap", padding: "30px", justifyContent: "space-around", alignItems: "center", gap: "10px" }}>
                    {
                        results.map((book) => (
                            <>
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "20px", width: "200px", height: "100px", border: "1px solid black", borderRadius: "10px" }}>
                                    <b>Title:{book.title}</b>
                                    <span>Edition count: {book.edition_count}</span>
                                    <button style={{
                                        background: "lightgreen",
                                        color: "black",
                                        border: "none",
                                        padding: "10px",
                                        borderRadius: "10px",
                                        cursor:"pointer"
                                    }} 
                                    onClick={()=>addToBookshelf(book)}>Add to BookSelf</button>
                                </div>
                            </>
                        ))
                    }
                </div>
            )}
        </>
    )
}

export default BookSearch