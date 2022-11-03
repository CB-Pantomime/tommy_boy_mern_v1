
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages & components
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import About from './pages/About'
import Flash from './pages/Flash'
import Music from './pages/Music'
import Sculptures from './pages/Sculptures';
import Collage from './pages/Collage';
import Navbar from './components/Navbar'


function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
          <Route 
              path="/" 
              element={<Home />} 
            />
          <Route 
              path="/blogs" 
              element={<Blogs />} 
            />
          <Route 
              path="/flash" 
              element={<Flash />} 
            />
             <Route 
              path="/sculptures" 
              element={<Sculptures />} 
            />
             <Route 
              path="/music" 
              element={<Music />} 
            />
             <Route 
              path="/collage" 
              element={<Collage />} 
            />
          <Route 
            path="/about" 
            element={<About />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;