
import { BrowserRouter, 
  Routes, 
  Route
  , 
  Navigate
 } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import About from './pages/About'
import Flash from './pages/Flash'
import Music from './pages/Music'
import Sculptures from './pages/Sculptures';
import Collage from './pages/Collage';
import Navbar from './components/Navbar'

// auth
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'

function App() {

  const { user } = useAuthContext()

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

          {/* AUTH */}
          <Route 
            path="/signup" 
            element={<Signup />} 
            />
          <Route 
            path="/login" 
            element={user ? <Blogs/> : <Login />} 
            />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;