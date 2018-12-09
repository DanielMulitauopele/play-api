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
      let songCount;

      database('songs').select()
        .then(songs => {
          songCount = songs.length;
        })
        .then(() => {
          chai.request(server)
            .delete('/api/v1/songs/1')
            .end((err, response) => {
              response.should.have.status(204);
              songCount--;
            });
        })
        .then(() => {
          database('songs').select()
            .then(songs => {
              songs.length.should.equal(songCount);
            })
            .catch(error => console.error({ error }));
        })
        .catch(error => console.error({ error }));
      done();
    });

    it('should return an error if song does not exist', done => {
      chai.request(server)
        .delete('/api/v1/songs/5000')
        .end((err, response) => {
          response.should.have.status(404);
          response.should.be.json;
          response.should.be.a('Object');
          response.body.should.have.property('message');
          response.body.message.should.equal('Song with ID 5000 not found');
          done();
        })
    });
  });

  describe('GET /api/v1/songs', () => {
    it('should return all favorited songs', done => {
      chai.request(server)
      .get('/api/v1/favorites')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.should.be.a('Object')
        response.body.should.be.a('Array');
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('artist_name');
        response.body[0].should.have.property('genre');
        response.body[0].should.have.property('song_rating');
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
        response.should.be.a('Object');
        response.body.should.be.a('Array');
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('artist_name');
        response.body[0].should.have.property('genre');
        response.body[0].should.have.property('song_rating');
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
