
import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>home</h1>
        </Link>
        <Link to="/blogs">
          <h1>blogs</h1>
        </Link>
        <Link to="/flash">
          <h1>flash</h1>
        </Link>
        <Link to="/sculptures">
          <h1>sculptures</h1>
        </Link>
        <Link to="/music">
          <h1>music</h1>
        </Link>
        <Link to="/collage">
          <h1>collage</h1>
        </Link>
        <Link to="/about">
          <h1>about</h1>
        </Link>
      </div>
    </header>
  )
};

export default Navbar;