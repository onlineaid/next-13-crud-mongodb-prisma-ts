'use client'

import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  title: string;
  description: string;
  createAt: string;
  updateAt: string;
}

const url = `http://localhost:3000/api/posts`;

const getPostsData = async () => {
  const response = await fetch(url, { cache: "no-store" });
  const productData: Product[] = await response.json();
  return productData;
};

export default async function Product() {
  const [posts, setPosts] = useState<Product[]>([]);

  useEffect(() => {
    getPostsData().then((data) => setPosts(data));
  }, []);

  const handleDelete = async (postId: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // If the delete request is successful, refresh the post list
        const updatedPosts = posts.filter((post) => post.id !== postId);
        setPosts(updatedPosts);
      } else {
        console.error("An error occurred while deleting the post");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl mt-10">Post page</h1>

      <Link href={`/post/create`}>Create post</Link>

      <hr />

      {posts.map((item) => (
        <div key={item.id} className="p-5 mt-10 bg-red-500">
          <div className="text-1xl flex justify-between">
            <Link href={`/post/${item.id}`}>{item.title}</Link>
            <button onClick={() => handleDelete(item.id)}>Delete Post</button>
          </div>
        </div>
      ))}
    </div>
  );
}
