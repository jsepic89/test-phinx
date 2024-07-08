import React from 'react'
import { Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material'

const PokemonCard = ({pokemon, onSelect}) => {
  return (
    <Card className=''>
      <CardActionArea onClick={() => onSelect(pokemon)}>
        <CardMedia
            component="img"
            height="140"
            image={pokemon.imageUrl}
            alt={pokemon.name}
          />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {pokemon.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default PokemonCard