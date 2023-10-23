'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface SearchResponse {
  results: Post[];
  error?: string;
}

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSearch = async () => {
    setError(null);
    setResults(null);

    if (!query) {
      setError('Please enter a search term');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/search?query=${query}`);
      if (response.ok) {
        const data: SearchResponse = await response.json();
        
        if (data.results?.length !== 0) {
          setError('No matching results found');
        } else {
          // Update the browser path to the search results page with the query
          router.push(`/search?query=${query}`);
          setResults(data.results);
        }
      } else {
        const errorData: SearchResponse = await response.json();
        setError(errorData.error || 'An error occurred during the search.');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred during the search.');
    }
  };

  return (
    <div>
      <h1>Post Search</h1>
      <div className='text-center mt-10'>
        <input
          className='border-2'
          type="text"
          placeholder="Enter a search term"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className='bg-red-500 px-7' onClick={handleSearch}>Search</button>
      </div>
      {error && <p>{error}</p>}

      {results && results.length > 0 && (
        <div>
          <h2 className='mt-5 text-2xl'>Search Results:</h2>
          {results.map((result) => (
            <div key={result.id} className="p-5 mt-10 bg-red-500">
              <h3>{result.title}</h3>
              <p>{result.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
