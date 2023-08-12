// App.js
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import ImageGrid from './ImageGrid';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    if (query === '') return;

    const fetchImages = async () => {
      const apiKey = '38774846-5387315b84da78bc0b7163748';
      const perPage = 20;
      const response = await fetch(
        `https://pixabay.com/api/?key=${apiKey}&q=${query}&page=${page}&per_page=${perPage}`
      );
      const data = await response.json();
      setImages((prevImages) => [...prevImages, ...data.hits]);
    };

    fetchImages();
  }, [query, page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="app">
      <SearchBar onSearch={handleSearch} />
      <ImageGrid images={images} />
    </div>
  );
};

export default App;
