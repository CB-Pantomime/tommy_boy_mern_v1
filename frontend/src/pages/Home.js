
import { useEffect } from "react"
import { useBlogsContext } from "../hooks/useBlogsContext"

// components
import BlogDetails from "../components/BlogDetails"
import BlogForm from "../components/BlogForm"

const Home = () => {
  const { blogs, dispatch } = useBlogsContext()

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch('/api/v1/blogs')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_BLOGS', payload: json})
      }
    }

    fetchBlogs()
  }, [blogs, dispatch])

  return (
    <div className="home">
      <div className="blogs">
        {blogs && blogs.map(blog => (
          <BlogDetails blog={blog} key={blog._id} />
        ))}
      </div>
      <BlogForm />
    </div>
  )
}

export default Home