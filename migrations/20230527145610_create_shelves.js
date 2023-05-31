/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('shelves', table => {
        table.increments('id').primary();
        table.integer('libraryId').unsigned().notNullable();
        table.string('genre').notNullable();
        table.timestamps(true, true);

        table.foreign('libraryId').references('id').inTable('libraries');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('shelves');
};
