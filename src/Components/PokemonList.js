import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/PokemonList.css'; // Import the CSS file

function fetchPokemonData(limit, offset) {
  return axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    .then(response => response.data.results)
    .catch(error => {
      console.error('Error fetching pokemon: ', error);
      return [];
    });
}

async function fetchPokemonDetails(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching pokemon details: ', error);
    return null;
  }
}

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 108;

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  }

  const prevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  }

  useEffect(() => {
    const fetchPokemon = async () => {
      const offset = (currentPage - 1) * limit;
      const data = await fetchPokemonData(limit, offset);

      // Fetch details for each Pokémon
      const pokemonDetails = await Promise.all(data.map(pokemon => fetchPokemonDetails(pokemon.url)));

      // Filter out null values (in case of failed requests)
      const filteredPokemonDetails = pokemonDetails.filter(pokemon => pokemon !== null);

      setPokemonList(filteredPokemonDetails);
    };

    fetchPokemon();
  }, [currentPage]);

  return (
    <div>
      <h2>Pokemon List</h2>
      <div className="pokemon-list">
        {pokemonList.map((pokemon, index) => (
          <Link key={index} to={`/pokemon/${pokemon.name}`} className={`pokemon-card ${pokemon.types[0].type.name}`}>
            <div>
              <p className="pokemon-name">{pokemon.name}</p>
            </div>
          </Link>
        ))}
      </div>
      <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
      <button onClick={nextPage}>Next</button>
    </div>
  );
}

export default PokemonList;
