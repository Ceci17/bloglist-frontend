import React from 'react'
import Input from '../Input'

const BlogForm = ({ values, handleBlogChange, handleBlogSubmit }) => {
  return (
    <form
      id="blog-form"
      onSubmit={handleBlogSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '5px',
        maxWidth: '300px'
      }}
    >
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
      <button
        style={{
          backgroundColor: 'rgb(34, 187, 51)',
          color: '#fff',
          padding: '5px',
          marginTop: '10px'
        }}
        type="submit"
      >
        add
      </button>
    </form>
  )
}

export default BlogForm
