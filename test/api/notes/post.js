process.env.NODE_ENV = 'test';

const expect = require ('chai').expect;
const request = require('supertest');

const app = require('../../../app.js');
const conn = require('../../../server.js')

describe('POST /users', () => {
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
    
    it('OK, creating a new user works', (done) => {
      request(app).post('/users')
        .send(
            { name: 'Paco',
              dob: '1994-01-22',
              address: 'Av Ejército Nacional 862, Polanco, Polanco II Secc, Miguel Hidalgo, 11550 Ciudad de México, CDMX',
              description: 'ok performance' 
        })
        .then((res) => {
          const body = res.body;
          //console.log("post body " , body);
          expect(body.userStored).to.contain.property('_id');
          expect(body.userStored).to.contain.property('name');
          expect(body.userStored).to.contain.property('dob');
          expect(body.userStored).to.contain.property('address');
          expect(body.userStored).to.contain.property('description');
          expect(body.userStored).to.contain.property('createdAt');
          expect(body.userStored).to.contain.property('updatedAt');
          done();
        })
        .catch((err) => done(err));
    });
      
    it('Fail, user requires dob, address and description', (done) => {
      request(app).post('/users')
        .send({ name: 'Paco' })
        .then((res) => {
          const body = res.body;
          //console.log(body)
          expect(body.message)
            .to.equal('User validation failed: dob: Path `dob` is required., address: Path `address` is required., description: Path `description` is required.')   
         done();
        })
        .catch((err) => done(err));
    });
    
  })