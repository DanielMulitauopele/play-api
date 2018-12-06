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
    let new_song = {
      "id": 1,
      "name": "We Will Rock You",
      "artist_name": "Queen",
      "genre": "Rock",
      "song_rating": 88
    }

    database('songs').insert(new_song)
    chai.request(server)
    .get(`/api/v1/songs/${new_song.id}`)
    .end((error, response) => {
      response.should.have.status(200);
      response.should.be.json;
      done();
    })
  });
});

// describe('/GET/:id book', () => {
//       it('it should GET a book by the given id', (done) => {
//           let book = new Book({ title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, pages: 1170 });
//           book.save((err, book) => {
//               chai.request(server)
//             .get('/book/' + book.id)
//             .send(book)
//             .end((err, res) => {
//                   res.should.have.status(200);
//                   res.body.should.be.a('object');
//                   res.body.should.have.property('title');
//                   res.body.should.have.property('author');
//                   res.body.should.have.property('pages');
//                   res.body.should.have.property('year');
//                   res.body.should.have.property('_id').eql(book.id);
//               done();
//             });
//           });
//
//       });
//   });
