import React from 'react';
import ReactDOM from 'react-dom';
var Article = ({postId,title,content,author,time,removePost,isShow}) => {
  const Options = (
    <div>
      <a href = {`/#/posts/${postId}/edit`}>编辑</a>&nbsp;&nbsp;
      <a  onClick = {removePost}>删除</a>
    </div>
  );
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
      <div className = 'post-footer' >
        {isShow?Options:[]}
      </div>
    </article>
  )
}
export default Article;
