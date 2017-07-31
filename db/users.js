const Knex = require('knex')
const knexConfig = require('../knexfile')[process.env.NODE_ENV || 'development']
const knex = Knex(knexConfig)

const getUserById = (id) => knex('users').where('id', id)

const createUser = (user) => knex('users').insert(user)

module.exports = {
    getUserById,
    createUser
}
