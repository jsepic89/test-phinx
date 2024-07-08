import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pokemon } from 'src/pokemons/entities/pokemon.entity';
import { Battle } from './entities/battle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BattleService {

  constructor(
    @InjectRepository(Pokemon) private pokemonRepository: Repository<Pokemon>,
    @InjectRepository(Battle) private battleRepository: Repository<Battle>
  ) {}


  calculateDamage(attacker: Pokemon, defender: Pokemon): number {
    const damage = attacker.attack - defender.defense;
    return damage > 0 ? damage : 1;
  }

  async battle(pokemon1: Pokemon, pokemon2: Pokemon): Promise<Battle> {
    
    let firstAttacker: Pokemon;
    let secondAttacker: Pokemon;

    if (pokemon1.speed > pokemon2.speed || pokemon1.speed === pokemon2.speed && pokemon1.attack > pokemon2.attack) {
      firstAttacker = pokemon1;
      secondAttacker = pokemon2;
    } else {
      firstAttacker = pokemon2;
      secondAttacker = pokemon1;
    }

    let firstAttackerHP = firstAttacker.hp;
    let secondAttackerHP = secondAttacker.hp;

    while (firstAttackerHP > 0 && secondAttackerHP > 0) {
      secondAttackerHP -= this.calculateDamage(firstAttacker, secondAttacker);

      if (secondAttackerHP <= 0) {
        break;
      }
      firstAttackerHP -= this.calculateDamage(secondAttacker, firstAttacker);
      if (firstAttackerHP <= 0) {
        break;
      }
    }

    const winner = firstAttackerHP > 0 ? firstAttacker.name : secondAttacker.name;


    const battle = new Battle();
    battle.pokemon1 = pokemon1;
    battle.pokemon2 = pokemon2;
    battle.winner = winner

    return await this.battleRepository.save(battle);
  }
}
