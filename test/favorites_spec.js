process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV = 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('GET /api/v1/songs', () => {
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

describe('GET /api/v1/songs', () => {
  it('should return song by id', done => {
    chai.request(server)
    .get('/api/v1/songs/:id')
    .end((error, response) => {
      response.should.have.status(200);
      response.should.be.json;
      done();
    })
  });
});
