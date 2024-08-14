import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/movies')
      .then(response => setMovies(response.data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Movie List</h1>
      <ul style={styles.list}>
        {movies.map(movie => (
          <li key={movie.id} style={styles.listItem}>
            <h2 style={styles.title}>{movie.title} ({movie.year_of_release})</h2>
            <p style={styles.details}><strong>Genre:</strong> {movie.genre}</p>
            <p style={styles.details}><strong>Director:</strong> {movie.director}</p>
            <p style={styles.description}>{movie.description}</p>
            <p style={styles.status}><strong>Status:</strong> {movie.status ? 'Available' : 'Not Available'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    backgroundColor: '#f9f9f9',
    marginBottom: '20px',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    margin: '0 0 10px',
    fontSize: '1.5em',
    color: '#333',
  },
  details: {
    margin: '5px 0',
    fontSize: '1em',
    color: '#666',
  },
  description: {
    fontSize: '1em',
    color: '#444',
    margin: '10px 0',
  },
  status: {
    fontSize: '1em',
    fontWeight: 'bold',
    color: movie => (movie.status ? 'green' : 'red'),
  },
};

export default MovieList;
