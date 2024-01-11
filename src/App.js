
import { useState, useEffect } from "react";
import React from "react";
import './App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';

// 7eabc8f4

const API_URL = 'https://www.omdbapi.com/?i=tt3896198&apikey=7eabc8f4';

const App = () => {
    const[movies, setMovies] = useState([]);
    const[searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Matrix');
    }, []);


    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input 
                    type="text" 
                    placeholder="Search for a movies..." 
                    value={searchTerm}
                    className="search__input" 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            searchMovies(searchTerm);
                        }
                    }}
                />
                <img
                    src={SearchIcon}
                    alt='Search'
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0  
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <div key={movie.imdbID}>
                                <MovieCard movie={movie}/>
                            </div>
                        ))}      
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )}

            
        </div>
    );
}

export default App;