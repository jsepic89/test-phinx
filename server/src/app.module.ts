import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonsModule } from './pokemons/pokemons.module';
import { BattleModule } from './battle/battle.module';
import { dataSourceOptions } from '../db/dataSource';

@Module({
  imports: [ 
    TypeOrmModule.forRoot(dataSourceOptions),
    PokemonsModule,
    BattleModule
  ],
})
export class AppModule {}
