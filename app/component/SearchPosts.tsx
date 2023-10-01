import { useState } from 'react';

interface SearchResponse {
  results: Product[];
  message?: string;
  error?: string;
}

interface Product {
  id: number;
  title: string;
  body: string;
}

interface SearchPostsProps {
  onSearchResults: (results: Product[]) => void;
}

export default function SearchPosts({ onSearchResults }: SearchPostsProps) {
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState<string>('');
  
  const searchPosts = async () => {
    if (!query) {
      setMessage('Please enter a search term');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/search?query=${query}`);
      if (response.ok) {
        const data: SearchResponse = await response.json();
        onSearchResults(data.results);
        setMessage(data.results.length === 0 ? 'No matching results found' : '');
      } else {
        const errorData: SearchResponse = await response.json();
        setMessage(errorData.error || 'An error occurred during the search.');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred during the search.');
    }
  }

  return (
    <div>
      <h1>Post Search</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a search term"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />   
        <button onClick={searchPosts}>Search</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
}
