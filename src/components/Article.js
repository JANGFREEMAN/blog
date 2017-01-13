import React from 'react';
import ReactDOM from 'react-dom';
var Article = ({title,content,author,time,getUserIndex,removePost}) => {
  return (
    <article className = 'post'>
      <div className = 'post-head'>
        <h2 className = 'post-title'><a >{title}</a></h2>
        <div className = 'post-meta'>
          <span className = 'author'>作者:<a onClick = {getUserIndex}>{author}</a></span>•<time>{time}</time>
        </div>
      </div>
      <div className = 'post-content'>
        <p dangerouslySetInnerHTML={{__html: content}}></p>
      </div>
      <div className = 'post-button' >
        <a href = ''>阅读全文</a>
      </div>
      <div className = 'post-footer' >
        <a >编辑</a>&nbsp;&nbsp;
        <a  onClick = {removePost}>删除</a>
      </div>
    </article>
  )
}
export default Article;
