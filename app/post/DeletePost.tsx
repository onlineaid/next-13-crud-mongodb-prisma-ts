"use client";

import { useEffect, useState } from "react";

const DeletePost = ({ postId }: any) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (isDeleted) {
      setSuccessMessage("Post deleted successfully!");
      // You can add code to handle what happens after the post is deleted, e.g., refresh the post list.
    }
  }, [isDeleted]);

  const handleDelete = async () => {
    console.log('lol delete')
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setIsDeleted(true);
      } else {
        console.error("An error occurred while deleting the post");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Post</button>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default DeletePost;
