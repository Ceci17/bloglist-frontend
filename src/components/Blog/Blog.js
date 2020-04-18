import React, { useState } from 'react'
import { BlogTitle, Like } from './components'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [visible, setVisible] = useState(false)

  const handleView = () => setVisible(!visible)

  return (
    <article className="blog">
      <BlogTitle title={blog.title} author={blog.author}>
        <button className="btn btn-show" onClick={handleView}>
          {visible ? 'hide' : 'view'}
        </button>
      </BlogTitle>
      {visible && (
        <div style={{ marginTop: 10 }}>
          <div className="blog-url" style={{ marginBottom: 10 }}>
            <a href={blog.url}>{blog.url}</a>
          </div>
          <Like
            likes={blog.likes}
            handleLike={() => handleLike(blog)}
          />
          <p
            className="blog-author"
            style={{
              marginTop: 10,
              marginBottom: 0,
              fontStyle: 'italic'
            }}
          >
            {blog.user.name}
          </p>
          {user.username === blog.user.username && (
            <button
              style={{
                backgroundColor: '#bb2124',
                color: '#fff',
                border: 0,
                borderRadius: 5,
                padding: 5,
                marginTop: 10
              }}
              onClick={() => handleDelete(blog, blog.id)}
            >
              delete
            </button>
          )}
        </div>
      )}
    </article>
  )
}

export default Blog
