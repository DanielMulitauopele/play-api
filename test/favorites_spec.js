process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('API Songs Endpoint', () => {
  describe('DELETE /api/v1/songs/:id', () => {
    it('should delete a song', done => {
      chai.request(server)
        .delete('/api/v1/songs/1')
        .end((err, response) => {
          response.should.have.status(204);
          done();
        });
    });

    it('should return an error if song does not exist', done => {
      chai.request(server)
        .delete('/api/v1/songs/4')
        .end((err, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.should.be.a('Object');
          response.body.should.have.property('message');
          response.body.message.should.equal('Song with ID 4 not found');
          done();
        })
    });
  });

  describe('GET /api/v1/songs', () => {
    it('should return all favorited songs', done => {
      chai.request(server)
      .get('/api/v1/songs')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        done();
      });
    });
  });

  describe('GET /api/v1/songs/:id', () => {
    it('should return song by id', done => {
      chai.request(server)
      .get('/api/v1/songs/2')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body[0].name.should.equal('Fooey')
        response.body[0].artist_name.should.equal('Bobbie')
        response.body[0].genre.should.equal('Rap')
        response.body[0].song_rating.should.equal(62)
        done();
      });
    });

    it('should return error if id does not exist', done => {
      chai.request(server)
      .get('/api/v1/songs/7')
      .end((error, response) => {
        response.should.have.status(404);
        response.body.error.should.equal(`Could not find song with id: 7`);
        done();
      });
    });
  });
});
