import { Module } from '@nestjs/common';
import { BattleService } from './battle.service';
import { BattleController } from './battle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Battle } from './entities/battle.entity';
import { Pokemon } from 'src/pokemons/entities/pokemon.entity';
import { PokemonsModule } from 'src/pokemons/pokemons.module';

@Module({
  imports: [TypeOrmModule.forFeature([Battle, Pokemon]),PokemonsModule],
  controllers: [BattleController],
  providers: [BattleService],
})
export class BattleModule {}
