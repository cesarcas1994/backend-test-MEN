process.env.NODE_ENV = 'test';

const expect = require ('chai').expect;
const should = require('chai').should();
const request = require('supertest');

const app = require('../../../app.js');
const conn = require('../../../server.js')

describe('GET /users', () => {
  before((done) => {
    conn.connect()
      .then(() => done())
      .catch((err) => done(err));
  })

  after((done) => {
    conn.close()
      .then(() => done())
      .catch((err) => done(err));
  })

  it('OK, getting users has users in db, db is not empty', (done) => {
    request(app).get('/users')
      .then((res) => {
        const body = res.body;
        //console.log("getall body " , body)
        res.should.have.property('status', 200);
        res.body.should.be.a('array');
        done();
      })
      .catch((err) => done(err));
  });
  
})