
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('entries').del()
    .then(function () {
      // Inserts seed entries
      return knex('entries').insert([
        {id: 1, fullName: 'Richard Nixon', firstName: "Richard", lastName: "Nixon", age: "45", url: `https://media1.britannica.com/eb-media/73/103073-004-3CD66684.jpg`},
        {id: 2, fullName: 'Nelson Mandela', firstName: "Nelson", lastName: "Mandela", age: "64", url: `http://cdn.history.com/sites/2/2013/11/nelson-mandela-speech-AB.jpeg`},
        {id: 3, fullName: 'Joseph Stalin', firstName: "Joseph", lastName: "Stalin", age: "83", url: `https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Stalin_lg_zlx1.jpg/220px-Stalin_lg_zlx1.jpg`}
      ]);
    });
};
