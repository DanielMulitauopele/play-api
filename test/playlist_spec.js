process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('POST /api/v1/playlists', () => {
  it('should create a new playlist', done => {
    chai.request(server)
      .post('/api/v1/playlists')
      .send({
        playlist_name: 'Test Playlist 2'
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('playlist');
        done();
    });
  });
});
