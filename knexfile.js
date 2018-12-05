// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/play',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: 'postgres://posdbbnvjqqogr:c228eb64e7c78be61324792ea4b02206a51455a7cb28d1ea4a8c5b61e5a1b210@ec2-23-21-201-12.compute-1.amazonaws.com:5432/d4oneut0sskh52',
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './db/migrations'
    },
    ssl: true
  }

};
