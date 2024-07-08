import './App.css';
import { useEffect, useState } from 'react';
import PokemonCard from './components/PokemonCard';
import { Container, Grid, Box, Button, Typography } from '@mui/material';
import CardsWithStats from './components/CardsWithStats';
import axios from 'axios';

function App() {
  const [ pokemons, setPokemons ] = useState([]);
  const [ pokemon1, setPokemon1 ] = useState(null);
  const [ pokemon2, setPokemon2 ] = useState(null);
  const [ winner, setWinner ] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch('http://localhost:3000/pokemons');
      const data = await response.json();
      setPokemons(data);
    };
    fetchPokemon();
  }, []);


  const handleSelect = (pokemon) => {
    setPokemon1(pokemon);
    const otherPokemons = pokemons.filter(p => p.id !== pokemon.id);
    setPokemon2(otherPokemons[Math.floor(Math.random() * otherPokemons.length)]);
  };

  const handleBattle = async () => {
    const battle = await axios.post('http://localhost:3000/battle', {
      pokemon1Id: pokemon1.id,
      pokemon2Id: pokemon2.id,
    });

    const battleResult = battle.data.winner;

    setWinner(battleResult);
  };

  return (
    <Container className="App" maxWidth="md">
      <h1 style={{textAlign: 'left'}}>Battle of Pokemon</h1>
      {" "}
      <h3 style={{textAlign: 'left'}}>Select your Pokemon</h3>
      <Grid container spacing={2}>
        {pokemons.map((pokemon) => (
          <Grid item xs={2} key={pokemon.name}>
            <PokemonCard pokemon={pokemon} onSelect={handleSelect} />
          </Grid>
        ))}
      </Grid>
      {winner && (
        <Box sx={{ width: '80%' }} mt={4} p={2} border={1} borderRadius={4} bgcolor="primary.light">
          <Typography variant="h6" style={{textAlign: 'left'}}>{winner} wins!</Typography>
        </Box>
      )}
      {pokemon1 && pokemon2 && (
        <Box mt={4}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <CardsWithStats pokemon={pokemon1} />
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" color="success" onClick={(handleBattle)} style={{textTransform: 'none'}}>Start Battle</Button>
            </Grid>
            <Grid item xs={4}>
              <CardsWithStats pokemon={pokemon2} />
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
}

export default App;
