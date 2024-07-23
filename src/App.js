import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import Post from "./components/Post";
import Loading from "./components/Loading";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=${limit}`
        );
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [limit]);

  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setLimit((prevLimit) => prevLimit + 20);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <div className="App">
      <h1>Single Page Application</h1>
      {posts.map((post, index) => {
        const postNumber = index + 1; // Numbering posts starting from 1
        if (posts.length === index + 1) {
          return (
            <Post
              ref={lastPostElementRef}
              key={post.id}
              post={post}
              number={postNumber}
            />
          );
        } else {
          return <Post key={post.id} post={post} number={postNumber} />;
        }
      })}
      {loading && <Loading />}
    </div>
  );
};

export default App;
