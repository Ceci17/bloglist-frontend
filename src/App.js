import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import useForm from './hooks/useForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import LoggedUser from './components/LoggedUser'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    error: null,
    success: null
  })

  const blogFormRef = React.createRef()

  const { values: loginValues, handleChange, setValues } = useForm({
    username: '',
    password: ''
  })

  const {
    values: blogValues,
    handleChange: handleBlogChange,
    setValues: setBlogValues
  } = useForm({
    title: '',
    author: '',
    url: ''
  })

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: loginValues.username,
        password: loginValues.password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setNotification({
        ...notification,
        success: `Welcome, ${user.name}`
      })
      setTimeout(
        () => setNotification({ error: null, success: null }),
        2000
      )
      setValues({ username: '', password: '' })
    } catch (exception) {
      console.error(exception)
      setNotification({
        ...notification,
        error: 'Wrong username or password'
      })
      setTimeout(
        () => setNotification({ error: null, success: null }),
        2000
      )
    }
  }

  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create({
        title: blogValues.title,
        author: blogValues.author,
        url: blogValues.url
      })

      const { username, name } = user

      const populatedBlog = {
        ...newBlog,
        user: {
          id: newBlog.user,
          username,
          name
        }
      }

      setBlogs([...blogs, populatedBlog])
      setBlogValues({ title: '', author: '', url: '' })

      setNotification({
        ...notification,
        success: `A new blog ${newBlog.title} by ${newBlog.author} added`
      })
      setTimeout(
        () => setNotification({ error: null, success: null }),
        2000
      )
    } catch (exception) {
      console.error(exception)
      setNotification({
        ...notification,
        error: `Required fields title and url missing`
      })
      setTimeout(
        () => setNotification({ error: null, success: null }),
        2000
      )
    }
  }

  const handleDelete = async (blog, id) => {
    if (
      window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    ) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter((blogs) => blogs.id !== id))
        setNotification({
          ...notification,
          success: `Successfully deleted ${blog.title} by ${blog.author}`
        })
        setTimeout(
          () => setNotification({ error: null, success: null }),
          2000
        )
      } catch (exception) {
        setNotification({
          ...notification,
          error: `You don't have permission to delete this blog post`
        })
        setTimeout(
          () => setNotification({ error: null, success: null }),
          2000
        )
      }
    }
  }

  const handleLike = async (blog) => {
    try {
      const likedBlog = {
        ...blog,
        user: { ...blog.user },
        likes: blog.likes + 1
      }
      await blogService.update(likedBlog, blog.id)

      setBlogs(
        blogs.map((blog) =>
          blog.id === likedBlog.id ? likedBlog : blog
        )
      )
    } catch (exception) {
      console.log(exception)
    }
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notification} />
      {!user ? (
        <LoginForm
          values={loginValues}
          handleChange={handleChange}
          handleLogin={handleLogin}
        />
      ) : (
        <>
          <LoggedUser name={user.name} logout={logout} />
          <Togglable
            openLabel="create new blog"
            closeLabel="cancel"
            ref={blogFormRef}
          >
            <BlogForm
              values={blogValues}
              handleBlogChange={handleBlogChange}
              handleBlogSubmit={handleBlogSubmit}
            />
          </Togglable>
          <BlogList
            blogs={blogs}
            handleLike={handleLike}
            handleDelete={handleDelete}
            user={user}
          />
        </>
      )}
    </div>
  )
}

export default App
