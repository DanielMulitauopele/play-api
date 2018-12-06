const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

before((done) => {
  database.migrate.latest()
    .then(() => done())
    .catch(error => {
      throw error;
    });
});

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
