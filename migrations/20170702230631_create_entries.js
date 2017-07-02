
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('entries', function(table){
    table.increments('id')
    table.string('fullName')
    table.string('firstName')
    table.string('lastName')
    table.string('url')
    table.string('age')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('entries')
};
