process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('API Playlist Endpoints', () => {
  beforeEach((done) => {
    database.migrate.rollback()
      .then(() => {
        database.migrate.latest()
          .then(() => {
            database.seed.run()
            .then(() => done())
            .catch(error => {
              throw error;
            });
          });
      });
  });

  describe('POST /api/v1/playlists', () => {
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
    it('should add a song to an existing playlist', done => {
      chai.request(server)
        .post('/api/v1/playlists/1/songs/1')
        .end((err, response) => {
          response.should.have.status(201);
          response.should.be.json;
          response.body.should.be.a('Object');
          response.body.should.have.property('message');
          response.body.message.should.equal('Successfully added Fooo to Chill Mood');
          done();
        });
    });

    it('should not add a song to invalid playlist', done => {
      chai.request(server)
        .post('/api/v1/playlists/1000/songs/1')
        .end((err, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.should.be.a('Object');
          response.body.should.have.property('error');
          response.body.error.should.equal('Playlist with ID 1000 does not exist')
          done();
        });
    });

    it('should not add an invalid song to playlist', done => {
      chai.request(server)
        .post('/api/v1/playlists/1/songs/1000')
        .end((err, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.should.be.a('Object');
          response.body.should.have.property('error');
          response.body.error.should.equal('Song with ID 1000 does not exist')
          done();
        });
    });
  });

  describe('GET /api/v1/playlists/:id/songs', () => {
    it('should return all songs in a specific playlist', done => {
      chai.request(server)
        .get('/api/v1/playlists/1/songs')
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.should.be.a('Object');
          response.body.should.have.property('id');
          response.body.should.have.property('playlist_name');
          response.body.should.have.property('songs');
          response.body.songs.should.be.a('Array');
          response.body.songs.should.have.lengthOf(3);
          response.body.songs[0].should.have.property('id');
          response.body.songs[0].should.have.property('name');
          response.body.songs[0].should.have.property('artist_name');
          response.body.songs[0].should.have.property('genre');
          response.body.songs[0].should.have.property('song_rating');
          done();
        })
    });

    it('should return 404 if given invalid playlist', () => {
      chai.request(server)
        .get('/api/v1/playlists/1000/songs')
        .end((error, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.should.be.a('Object');
          response.should.have.property('error');
          response.body.error.should.equal('Playlist with ID 1000 does not exist');
        })
    });
  });
});
