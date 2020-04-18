import React from 'react'

export const Like = ({ likes, handleLike }) => {
  return (
    <div className="blog-likes">
      <span className="total-likes">
        {likes} {likes == 1 ? 'like' : 'likes'}{' '}
      </span>
      <button className="btn btn-like" onClick={handleLike}>
        like
      </button>
    </div>
  )
}
