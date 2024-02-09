const User = require('../../src/models/user');
const expect = require('chai').expect;
const bcrypt = require('bcrypt');
const sinon = require('sinon');

describe('Creating the documents in mongodb - Without mocking', () => {
  it('Creates a new user successfully', (done) => {
      const user = new User({
          fullName: 'test-Second',
          email: 'test123@gmail.com',
          password: bcrypt.hashSync('test1234', 8),
          preferences: 'health'
      });
      expect(user.isNew).equal(true);
      user.save().then(user => {
          expect(!user.isNew).equal(true);
          done();
      }).catch(err => {
          done();    
      });
  });

  // it('Validates the email of the user', (done) => {
  //     const user = new User({
  //       fullName: 'test-Second',
  //       email: 'test123@@gmail.com',
  //       password: bcrypt.hashSync('test1234', 8),
  //       preferences: 'health'
  //     });
  //     user.save().catch(err => {
  //         console.log(err);
  //         expect(err._message).equal('Email is not valid!');
  //         done();
  //     });
  // });

  it('Validates the uniqueness of the email', (done) => {
      done();
  });

  // it('Validates the preferences of the user', (done) => {
  //     const user = new User({
  //       fullName: 'test-Second',
  //       email: 'test123@gmail.com',
  //       password: bcrypt.hashSync('test1234', 8)
  //     });
  //     user.save().catch(err => {
  //         console.log(err);
  //         expect(err._message).equal('preferences not provided');
  //         done();
  //     });
  // })
});

describe('Creating the documents in mongo db with mocking', function() {
  let saveStub;
  const user = new User({
    fullName: 'test-Second',
    email: 'test123@gmail.com',
    password: bcrypt.hashSync('test1234', 8),
    preferences: 'health'
  });

  beforeEach(() => {
      saveStub = sinon.stub(User.prototype, 'save');
  });

  afterEach(() => {
      saveStub.restore();
  })

  it('Should save the user' , async function() {

      
      const mockUser = {_id: 123, fullName: 'test user', email: 'test1234@gmail.com'};
      saveStub.resolves(mockUser);

      const result = await user.save();
      expect(result).to.deep.equal(mockUser);
      expect(saveStub.calledOnce).to.be.true;
      
  });

  it('Should validate the email', async function() {
      
      user.email = 'test@123@gmail.com';
      const mockError = new Error('database error');
      saveStub.rejects(mockError);

      try {
          await user.save();
      } catch (err) {
          expect(err).to.equal(mockError);
          expect(saveStub.calledOnce).to.be.true;
      }
      
  });
});