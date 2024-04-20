import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function PokemonDetails() {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const { name } = useParams();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemonDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching pokemon details: ', error);
        setPokemonDetails(null);
      }
    };

    fetchPokemonDetails();
  }, [name]);

  if (!pokemonDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{pokemonDetails.name}</h2>
      <img src={pokemonDetails.sprites.front_default} alt={pokemonDetails.name} />
      <h3>Abilities:</h3>
      <ul>
        {pokemonDetails.abilities.map((ability, index) => (
          <li key={index}>{ability.ability.name}</li>
        ))}
      </ul>
      <Link to="/">Back to Pokemon List</Link>
    </div>
  );
}

export default PokemonDetails;
