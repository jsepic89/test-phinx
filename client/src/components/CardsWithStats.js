import React from 'react'
import { Card, CardContent, Box, Typography, LinearProgress } from '@mui/material'

const CardsWithStats = ({pokemon}) => {
  return (
    <Card>
      <CardContent>
        <Box display="flex" alignItems="center" flexDirection="column">
          <img src={pokemon.imageUrl} alt={pokemon.name} style={{ height: 140 }} />
          <Typography variant="h5" component="div">{pokemon.name}</Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="body2" style={{textAlign: 'left'}}>HP</Typography>
          <LinearProgress variant="determinate" color='success' value={pokemon.hp * 10} />
          <Typography variant="body2" style={{textAlign: 'left'}}>Attack</Typography>
          <LinearProgress variant="determinate" color='success' value={pokemon.attack * 10} />
          <Typography variant="body2" style={{textAlign: 'left'}}>Defense</Typography>
          <LinearProgress variant="determinate" color='success' value={pokemon.defense * 10} />
          <Typography variant="body2" style={{textAlign: 'left'}}>Speed</Typography>
          <LinearProgress variant="determinate" color='success' value={pokemon.speed * 10} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardsWithStats