import React from 'react';
import {Link }from 'react-router-dom'
import CategoryTag from './CategoryTag';

const PostListItem = ({ post }) => {
const categoriesContainerStyle = {
  marginTop: '10px',
};
  const snippet = post.markdownContent
    .replace(/[#*`]/g, '') // A simple regex to remove common markdown characters
    .substring(0, 150) + '...';

    
  return (
   
   <Link to={`/post/${post.slug}`} className="post-link">
   <article className="post-list-item">
      <h2>{post.title}</h2>
      <div className="post-meta">
        <span>by {post.author}</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      <p>{snippet}</p>
      {post.categories && post.categories.length > 0 && (
        <div style={categoriesContainerStyle}>

          {post.categories.map(category => (
            <CategoryTag key={category} category={category} />
          ))}
        </div>
      )}

    </article>
    </Link>
  );
// return (
//     <div className="post-list-item">
//       <h2>
//         <Link to={`/post/${post.slug}`}>{post.title}</Link>
//       </h2>
//       <p className="post-meta">
//         By {post.author} on {new Date(post.createdAt).toLocaleDateString()}
//       </p>


//       {post.categories && post.categories.length > 0 && (
//         <div style={categoriesContainerStyle}>
//           {post.categories.map(category => (
//             <CategoryTag key={category} category={category} />
//           ))}
//         </div>
//       )}
//       {/* HIGHLIGHT END */}
//     </div>
//   );
  
};

export default PostListItem;