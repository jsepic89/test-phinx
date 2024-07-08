import { Controller, Post, Body } from '@nestjs/common';
import { BattleService } from './battle.service';
import { Pokemon } from 'src/pokemons/entities/pokemon.entity';
import { PokemonsService } from '../pokemons/pokemons.service';
import { Battle } from './entities/battle.entity';

@Controller('battle')
export class BattleController {
  constructor(
    private readonly battleService: BattleService,
    private readonly pokemonsService: PokemonsService
  ) {}

  @Post()
  async battle(@Body() battleData: { pokemon1Id: string, pokemon2Id: string }): Promise<Battle> {
    const { pokemon1Id, pokemon2Id } = battleData;

    const pokemon1 = await this.pokemonsService.findOne(pokemon1Id);
    const pokemon2 = await this.pokemonsService.findOne(pokemon2Id);
    return this.battleService.battle(pokemon1, pokemon2);
  }

  
}
