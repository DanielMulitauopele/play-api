process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
pry = require('pryjs');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('POST /api/v1/playlists', () => {
  beforeEach((done) => {
    database.migrate.rollback()
      .then(() => {
        database.migrate.latest()
          .then(() => done())
          .catch(error => {
            throw error;
          });
      });
  });

  afterEach((done) => {
    database.migrate.rollback()
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });

  it('should create a new playlist', done => {
    chai.request(server)
      .post('/api/v1/playlists')
      .send({
        playlist_name: 'Test Playlist 2'
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.should.have.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('playlist');
        response.body['playlist'].should.have.property('id');
        response.body['playlist'].should.have.property('playlist_name');
        response.body['playlist']['playlist_name'].should.equal('Test Playlist 2');
        done();
    });
  });

  it('should not create a playlist if field is empty', done => {
    chai.request(server)
      .post('/api/v1/playlists')
      .send({
        playlist_name: ''
      })
      .end((err, response) => {
        response.should.have.status(400);
        response.should.have.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('error');
        response.body.error.should.equal('Expected format: { playlist_name: <String> }.');
        done();
    });
  });
});

describe('GET /api/v1/playlists', () => {
  beforeEach((done) => {
    database.migrate.rollback()
      .then(() => {
        database.migrate.latest()
          .then(() => done())
          .catch(error => {
            throw error;
          });
      });
  });

  afterEach((done) => {
    database.migrate.rollback()
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });

  it('should return all playlists', done => {
    chai.request(server)
    .get('/api/v1/playlists')
    .end((error, response) => {
      response.should.have.status(200);
      response.should.be.json;
      done();
    });
  });
});

describe('POST /api/v1/playlists/:id/songs/:id', () => {
  beforeEach((done) => {
    database.migrate.rollback()
      .then(() => {
        database.migrate.latest()
          .then(() => done())
          .catch(error => {
            throw error;
          });
      });
  });

  afterEach((done) => {
    database.migrate.rollback()
      .then(() => done())
      .catch(error => {
        throw error;
      });
  });

  it('should add a song to an existing playlist', done => {
    song1 = {
      name: 'Song 1',
      artist_name: 'Artist 1',
      genre: 'Genre',
      song_rating: '80'
    }

    song2 = {
      name: 'Song 2',
      artist_name: 'Artist 1',
      genre: 'Genre',
      song_rating: '90'
    }

    database('playlists')
      .insert({ playlist_name: 'Test Playlist' }, 'id')
      .then(playlists => {
        return playlist = playlists[0];
      })
      .catch(error => console.error({ error }));

    database('songs').insert([song1, song2]);

    done();
  });
});
