exports.seed = function(knex, Promise) {
  // We must return a Promise from within our seed function
  // Without this initial `return` statement, the seed execution
  // will end before the asynchronous tasks have completed
  return knex('songs').del() // delete all footnotes first
    // Now that we have a clean slate, we can re-insert our paper data
    .then(() => {
      return Promise.all([
        // Insert a single paper, return the paper ID, insert 2 footnotes
        knex('songs').insert([
          { name: 'Fooo', artist_name: 'Bob', genre: 'Rock', song_rating: 80 },
          { name: 'Fooey', artist_name: 'Bobbie', genre: 'Rap', song_rating: 62 },
          { name: 'Gooey', artist_name: 'Bobart', genre: 'New Age Ambient Sounds', song_rating: 45 },
        ])
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
