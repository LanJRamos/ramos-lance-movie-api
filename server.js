const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname));

let movies = [
    {
        id: 1,
        title: "Interstellar",
        genre: "Science Fiction",
        year: 2014
    },
    {
        id: 2,
        title: "Avengers: Endgame",
        genre: "Action",
        year: 2019
    },
    {
        id: 3,
        title: "Coco",
        genre: "Animation",
        year: 2017
    }
];

// Get all movies
app.get("/api/movies", (req, res) => {
    res.json(movies);
});

// Get one movie by ID
app.get("/api/movies/:id", (req, res) => {

    const id = Number(req.params.id);

    const movie = movies.find(movie =>
        movie.id === id
    );

    if (!movie) {
        return res.status(404).json({
            message: "Movie not found"
        });
    }

    res.json(movie);
});

// Add a new movie
app.post("/api/movies", (req, res) => {

    const { title, genre, year } = req.body;

    if (!title || !genre || !year) {
        return res.status(400).json({
            message: "Title, genre, and year are required"
        });
    }

    const newMovie = {
        id: movies.length + 1,
        title: title,
        genre: genre,
        year: Number(year)
    };

    movies.push(newMovie);

    res.status(201).json(newMovie);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});