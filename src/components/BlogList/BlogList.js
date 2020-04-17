import React from 'react'
import Blog from '../Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, handleLike, handleDelete, user }) => {
  const sortedBlogs = blogs.sort(
    (a, b) => b.likes - a.likes || b.title - a.title
  )

  return (
    <div className="blog-list">
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleDelete={handleDelete}
          user={user}
        />
      ))}
    </div>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  user: PropTypes.object
}

export default BlogList
