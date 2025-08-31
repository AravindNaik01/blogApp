import React, { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "../markdown-styles.css"
import { Helmet } from 'react-helmet-async';

import CategoryTag from '../components/CategoryTag';



const PostPage = () => {
  // 2. Call the useParams hook to get the dynamic parameters from the URL.
  const { slug } = useParams();

  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    
    const fetched = async () => {
      
      try {
        const response = await axios.get(
                      //  `http://localhost:5000/api/posts/${slug}`

          `${process.env.REACT_APP_API_URL}/posts/${slug}`
        );
        setPost(response.data);
      } catch (err) {
        console.error("error to fetching the post", err);
        if (err.response && err.response.status === 404) {
          setError("Post not found.");
        } else {
          setError("Failed to load the post. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetched();
  }, [slug]);


   const createMetaDescription = (markdown) => {
    if (!markdown) return '';
    // Remove Markdown formatting and trim to a suitable length (e.g., 155 chars).
    const plainText = markdown
      .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Keep link text
      .replace(/[`*#_~]/g, '') // Remove markdown characters
      .replace(/\s+/g, ' '); // Normalize whitespace
    
    return plainText.substring(0, 155).trim() + '...';
  };

  if (loading) {
    return <div>Loading posts...</div>;
  }
  if (error) {
    return (
      <div style={{ color: "red", textAlign: "center", marginTop: "2rem" }}>
        Error: {error}
      </div>
    );
  }

  

  if (!post) {
    return <div>loading post...</div>;
  }

const categoriesContainerStyle = {
    marginTop: '1rem',
    marginBottom: '1rem',
    borderBottom: '1px solid #eee',
    paddingBottom: '1rem'
  };




  return (
    <article className="post-full">
        <Helmet>
        {/* We create a dynamic title using the post's title. */}
        <title>{`${post.title} | My Awesome Blog`}</title>
        {/* We create a dynamic meta description from the post's content. */}
        <meta 
          name="description" 
          content={createMetaDescription(post.markdownContent)} 
        />
      </Helmet>

      <h1>{post.title}</h1>
      <div className="post-full-meta">
        <span>by {post.author} </span>
        <span>
          Published on {new Date(post.createdAt).toLocaleDateString()}
        </span>
      </div>




      <div className="post-full-content">
        {/* <h4>Raw Markdown Content:</h4> */}

        {/* For now, we'll display the raw markdown. The next step is to parse this! */}
               <ReactMarkdown>{post.markdownContent}</ReactMarkdown>

      </div>

      {post.categories && post.categories.length > 0 && (
        <div style={categoriesContainerStyle}>
          {post.categories.map(category => (
            <CategoryTag key={category} category={category} />
          ))}
        </div>
      )}
    </article>
  );
};

export default PostPage;
