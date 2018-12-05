const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('POST /api/v1/playlists', () => {
  it('should create a new playlist', done => {
    chai.request(server)
      // Notice the change in the verb
      .post('/api/v1/playlists')
      // Here is the information sent in the body or the request
      .send({
        playlist_name: 'Test Playlist'
      })
      .end((err, response) => {
        // Different status here
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('id');
        response.body.should.have.property('playlist_name');
        done();
    });
  });
});
