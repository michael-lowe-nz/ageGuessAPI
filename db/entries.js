const Knex = require('knex')
const knexConfig = require('../knexfile')[process.env.NODE_ENV || 'development']
const knex = Knex(knexConfig)

const getAllEntries = () => knex('entries')

const getEntry = (id) => knex('entries').where('id', id)

const addEntry = (data) => knex('entries').insert(data)

const deleteEntry = (id) => knex('entries').where('id', id).del()

const getEntryByUrl = (wikiUrl) => knex.select('id').from('entries').where('wikiUrl', wikiUrl)

module.exports = {
  addEntry,
  deleteEntry,
  getEntryByUrl,
  getAllEntries,
  getEntry,
}
