import React from 'react';
import ReactDOM from 'react-dom';
var PrevArticle = ({title,content,author,time,postId}) => {
  return (
    <article className = 'post'>
      <div className = 'post-head'>
        <h2 className = 'post-title'><a >{title}</a></h2>
        <div className = 'post-meta'>
          <span className = 'author'>作者:<a href = {`/#/posts?author=${author}`}>{author}</a></span>•<time>{time}</time>
        </div>
      </div>
      <div className = 'post-content'>
        <p dangerouslySetInnerHTML={{__html: content}}></p>
      </div>
      <div className = 'post-button' >
        <a href = {`/#/posts/${postId}`}>阅读全文</a>
      </div>
    </article>
  )
}
export default PrevArticle;
