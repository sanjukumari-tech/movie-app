const connection = require('../config/db');

// Create a new movie
const createMovie = async (req, res) => {
  try {
    const { title, genre, year_of_release, director, description, status } = req.body;

    const [result] = await connection.promise().query(
      `INSERT INTO movies (title, genre, year_of_release, director, description, status) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, genre, year_of_release, director, description, status]
    );

    const newMovie = {
      id: result.insertId,
      title,
      genre,
      year_of_release,
      director,
      description,
      status,
    };

    res.status(201).json(newMovie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all movies
const getMovies = async (req, res) => {
  try {
    const [result] = await connection.promise().query("SELECT * FROM movies");
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
};

// Get a movie by ID
const getMovieById = async (req, res) => {
  try {
    const [result] = await connection.promise().query(
      "SELECT * FROM movies WHERE id = ?",
      [req.params.id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a movie
const updateMovie = async (req, res) => {
  try {
    const { title, genre, year_of_release, director, description, status } = req.body;

    const [result] = await connection.promise().query(
      `UPDATE movies SET title = ?, genre = ?, year_of_release = ?, director = ?, description = ?, status = ?
       WHERE id = ?`,
      [title, genre, year_of_release, director, description, status, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const updatedMovie = {
      id: req.params.id,
      title,
      genre,
      year_of_release,
      director,
      description,
      status,
    };

    res.status(200).json(updatedMovie);
  } catch (err) {
    res.status(500).send("Internal server error");
  }
};

// Delete a movie
const deleteMovie = async (req, res) => {
  try {
    const [result] = await connection.promise().query(
      "DELETE FROM movies WHERE id = ?",
      [req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json({ message: 'Movie deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getMovies, createMovie, deleteMovie, updateMovie, getMovieById };
