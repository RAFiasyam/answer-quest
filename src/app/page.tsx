'use client'
import React, { useEffect, useState } from "react";

interface Post {
  question: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fecthData() {
      const response = await fetch(
        'https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple'
      );
      const data = await response.json();
      setPosts(data.results);
    }
    fecthData();
  }, [])


  return (
    <ul>
      {posts.map((post, index) => (
        <li key={index} dangerouslySetInnerHTML={{ __html: post.question}} />
      ))}
    </ul>
  );
}
