import BookSearch from "./components/BookSearch";
import MyBooks from "./components/MyBooks";
import { Routes , Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
            <Route path="/" element={<BookSearch/>}/>
            <Route path="/my-books" element={<MyBooks/>}/>
      </Routes>
    
    </div>
  );
}

export default App;
