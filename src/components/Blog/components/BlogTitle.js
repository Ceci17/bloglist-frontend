import React from 'react'

export const BlogTitle = ({ title, author, children }) => {
  return (
    <div
      style={{
        fontSize: 16,
        fontWeight: 600,
        paddingRight: 50,
        position: 'relative'
      }}
    >
      <div className="blog-title">
        <span className="title">{title}</span> by{' '}
        <span className="author">{author}</span>
      </div>
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        {children}
      </div>
    </div>
  )
}
