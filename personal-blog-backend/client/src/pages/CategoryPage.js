// client/src/pages/CategoryPage.js

import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async"; // For SEO

import { useParams } from "react-router-dom";
import apiService from "../services/apiService";
import PostListItem from "../components/PostListItem";
import "./HomePage.css"; // Reusing styles from HomePage

const CategoryPage = () => {
  const { categoryName } = useParams();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPostsByCategory = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await apiService.get(
          `/posts/category/${categoryName}`
        );
        setPosts(response.data);
      } catch (err) {
        console.error(
          `Failed to fetch posts for category ${categoryName}:`,
          err
        );
        setError("Could not load posts for this category. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostsByCategory();
  }, [categoryName]);

  // Conditional rendering for loading and error states.
  if (loading) {
    return <div className="loading-message">Loading posts...</div>;
  }
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="home-page">
      <Helmet>
        <title>{`Posts in "${categoryName}" | My Awesome Blog`}</title>
        <meta
          name="description"
          content={`Browse all posts categorized under "${categoryName}" on My Awesome Blog.`}
        />
      </Helmet>

      <h1>Posts in: "{categoryName}"</h1>

      <div className="post-list">
        {posts.length > 0 ? (
          posts.map((post) => <PostListItem key={post._id} post={post} />)
        ) : (
          <p>No posts found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
