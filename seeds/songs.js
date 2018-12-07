exports.seed = function(knex, Promise) {
  // We must return a Promise from within our seed function
  // Without this initial `return` statement, the seed execution
  // will end before the asynchronous tasks have completed
  return knex('songs').del() // delete all footnotes first
    // Now that we have a clean slate, we can re-insert our song data
    .then(() => {
      return Promise.all([
        // Insert a single playlist, return the playlist ID, insert 3 songs
        knex('songs').insert([
          { name: 'Fooo', artist_name: 'Bob', genre: 'Rock', song_rating: 80 },
          { name: 'Fooey', artist_name: 'Bobbie', genre: 'Rap', song_rating: 62 },
          { name: 'Gooey', artist_name: 'Bobart', genre: 'New Age Ambient Sounds', song_rating: 45 },
        ], 'id')
        .then(songs => {
          return knex('playlist_songs').insert([
            { playlist_id: 1, song_id: songs[0] },
            { playlist_id: 1, song_id: songs[2] },
            { playlist_id: 1, song_id: songs[1] }
          ])
        })
        .catch(error => console.log(`Error seeding data: ${error}`))
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
