import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonsService {

  constructor(@InjectRepository(Pokemon) private pokemonRepository: Repository<Pokemon>) {}

  findAll() {
    return this.pokemonRepository.find();
  }

  findOne(id: string) {
    return this.pokemonRepository.findOne({ where: { id } });
  }
}
