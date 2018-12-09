exports.seed = function(knex, Promise) {
  return knex('songs').del()
    .then(() => {
      return Promise.all([
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
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
