import { MigrationInterface, QueryRunner } from "typeorm";

export class Pokemon1720096012904 implements MigrationInterface {
    name = 'Pokemon1720096012904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pokemon" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "attack" integer NOT NULL, "defense" integer NOT NULL, "hp" integer NOT NULL, "speed" integer NOT NULL, "type" varchar NOT NULL, "imageUrl" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "battle" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "winner" varchar NOT NULL, "pokemon1Id" varchar, "pokemon2Id" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_battle" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "winner" varchar NOT NULL, "pokemon1Id" varchar, "pokemon2Id" varchar, CONSTRAINT "FK_d6de3ef4c04a515afb256111fd0" FOREIGN KEY ("pokemon1Id") REFERENCES "pokemon" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_7df2fdef5c10626b94d7c7be3f0" FOREIGN KEY ("pokemon2Id") REFERENCES "pokemon" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_battle"("id", "winner", "pokemon1Id", "pokemon2Id") SELECT "id", "winner", "pokemon1Id", "pokemon2Id" FROM "battle"`);
        await queryRunner.query(`DROP TABLE "battle"`);
        await queryRunner.query(`ALTER TABLE "temporary_battle" RENAME TO "battle"`);
        await queryRunner.query(`
            INSERT INTO "pokemon" (id, name, attack, defense, hp, speed, type, imageUrl) VALUES
            ('pokemon-1', 'Pikachu', 4, 3, 3, 6, 'Type', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/025.png'),
            ('pokemon-2', 'Charmander', 4, 3, 3, 4, 'Type', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/004.png'),
            ('pokemon-3', 'Squirtle', 3, 4, 3, 3, 'Type', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/007.png'),
            ('pokemon-4', 'Bulbasur', 4, 3, 3, 3, 'Type', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png'),
            ('pokemon-5', 'Eevee', 4, 3, 4, 5, 'Type', 'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/133.png')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "pokemon" WHERE id IN ('pokemon-1', 'pokemon-2', 'pokemon-3', 'pokemon-4', 'pokemon-5')`);
        await queryRunner.query(`ALTER TABLE "battle" RENAME TO "temporary_battle"`);
        await queryRunner.query(`CREATE TABLE "battle" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "winner" varchar NOT NULL, "pokemon1Id" varchar, "pokemon2Id" varchar)`);
        await queryRunner.query(`INSERT INTO "battle"("id", "winner", "pokemon1Id", "pokemon2Id") SELECT "id", "winner", "pokemon1Id", "pokemon2Id" FROM "temporary_battle"`);
        await queryRunner.query(`DROP TABLE "temporary_battle"`);
        await queryRunner.query(`DROP TABLE "battle"`);
        await queryRunner.query(`DROP TABLE "pokemon"`);
    }

}
