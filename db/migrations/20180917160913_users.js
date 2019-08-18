exports.up = async function(knex, Promise) {
  await knex.raw('CREATE EXTENSION "pgcrypto"');
  return knex.schema.createTable('users', async (table) => {
    table.uuid('id').primary().notNullable().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').unique().notNullable();
    table.string('password').notNullable();
    table.string('token').notNullable();

    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = async function(knex, Promise) {
  await knex.raw('DROP EXTENSION "pgcrypto"');
  return knex.schema.dropTable('users');
};
