
// test/e2eController.test.js
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // ensure app.js exports the express app
const expect = chai.expect;
console.log('chaiHttp type:', typeof chaiHttp); // MUST say "function"
chai.use(chaiHttp);


describe('E-Commerce E2E Controller Tests', () => {

  describe('Auth Controller', () => {
    it('should load signup page', done => {
      chai.request(app)
        .get('/signup')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.include('Signup');
          done();
        });
    });

    it('should fail OTP without email', done => {
      chai.request(app)
        .post('/send-otp')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe('Cart Controller', () => {
    it('should return cart page for logged-in user', done => {
      chai.request(app)
        .get('/cart')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.include('Cart');
          done();
        });
    });
  });

  describe('Order Controller', () => {
    it('should reject order placement if cart is empty', done => {
      chai.request(app)
        .post('/place-order')
        .send({})
        .end((err, res) => {
          expect(res.status).to.be.oneOf([401, 400, 500]);
          done();
        });
    });
  });

});



   describe('Chatbot Controller', () => {
  it('should return chatbot reply', done => {
    chai.request(app)
      .post('/api/chatbot')
      .send({ message: 'hello' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('text');
        expect(res.body.text).to.be.a('string');
        done();
      });
  });
});

 describe('Home Controller', () => {
    it('should load home page', done => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.include('Home');
          done();
        });
    });

    it('should load about page', done => {
      chai.request(app)
        .get('/about')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.include('About');
          done();
        });
    });
  });

   describe('Shop Controller', () => {
    it('should load all products admin page', done => {
      chai.request(app)
        .get('/admin/products')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

});
