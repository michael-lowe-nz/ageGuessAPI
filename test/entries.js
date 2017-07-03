const test = require('blue-tape')

const {
  getEntries,
  addEntry,
  getAllEntries,
  deleteEntry
} = require('./../db/entries')


// test('DB has the seeded rows', t => {
//   getAllEntries()
//     .then(res => {
//       t.equal(res.length, 3, 'DB has 3 entries after seeding')
//     })
// })
//
// test('DB can make an entry', t => {
//   const entry = {
//     fullName: "Steve Guy",
//     id: 40,
//     age: "43",
//     url: "http://imgur.net.nz"
//   }
//   addEntry(entry)
//     .then(res => {
//       t.equal(res, 40, 'id is returned')
//       return getAllEntries()
//     })
//     .then(res => {
//       t.equal(res, entry)
//     })
// })
