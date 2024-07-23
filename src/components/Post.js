import React from "react";

const Post = React.forwardRef(({ post, number }, ref) => {
  return (
    <div ref={ref} className="post">
      <h2>Post #{number}</h2> {/* Display post number */}
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  );
});

export default Post;
