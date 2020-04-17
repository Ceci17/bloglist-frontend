import React from 'react'
import Input from '../Input'

const BlogForm = ({ values, handleBlogChange, handleBlogSubmit }) => {
  return (
    <form id="blog-form" onSubmit={handleBlogSubmit}>
      <Input
        id="title"
        label="title"
        type="text"
        value={values.title}
        name="title"
        onChange={handleBlogChange}
      />
      <Input
        id="author"
        label="author"
        type="text"
        value={values.author}
        name="author"
        onChange={handleBlogChange}
      />
      <Input
        id="url"
        label="url"
        type="text"
        value={values.url}
        name="url"
        onChange={handleBlogChange}
      />
      <button type="submit">add</button>
    </form>
  )
}

export default BlogForm
