import { Module } from '@nestjs/common';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonsController } from './pokemons.controller';
import { PokemonsService } from './pokemons.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon])],
  controllers: [PokemonsController],
  providers: [PokemonsService],
  exports: [PokemonsService],
})
export class PokemonsModule {}
