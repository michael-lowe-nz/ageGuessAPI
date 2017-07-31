const Knex = require('knex')
const knexConfig = require('../knexfile')[process.env.NODE_ENV || 'development']
const knex = Knex(knexConfig)

const getUserById = (id) => knex('users').where('id', id)

const createUser = (data) => knex('users').insert(data)

module.exports = {
    getUserById,
    createUser
}
