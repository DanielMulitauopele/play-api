exports.seed = function(knex, Promise) {
  return knex('playlists').del()
    .then(() => {
      return Promise.all([
        knex('playlists').insert([
          { playlist_name: 'Chill Mood' },
          { playlist_name: 'Party Mood' }
        ])
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
