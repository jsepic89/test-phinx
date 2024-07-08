import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Pokemon } from "../../pokemons/entities/pokemon.entity";

@Entity()
export class Battle {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Pokemon)
    pokemon1: Pokemon;

    @ManyToOne(() => Pokemon)
    pokemon2: Pokemon;

    @Column()
    winner: string;
}
