const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('GET /api/v1/songs', () => {
  it('should return all favorited songs', done => {
    chai.request(server)
    .get('/api/v1/songs')
    .end((error, response) => {
      response.should.have.status(200);
      done();
    })
  })
})
