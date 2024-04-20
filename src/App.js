import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonDetails from './Components/PokemonDetails';
import PokemonList from './Components/PokemonList';

function App() {
  return (
    <Router>
      <div>
        <h1>Pokedex</h1>
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
