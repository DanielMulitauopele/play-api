process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const knex = require('knex')(configuration);

chai.use(chaiHttp);

describe('POST /api/v1/playlists', () => {
  beforeEach((done) => {
    knex.migrate.rollback()
      .then(() => {
        knex.migrate.latest()
          .then(() => done())
          .catch(error => {
            throw error;
          });
      });
  });

  afterEach((done) => {
    knex.migrate.rollback()
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
});
