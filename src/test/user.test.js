import supertest from 'supertest';
import chai from 'chai';

const {
  expect
} = chai;

import app from '../app';

const server = supertest(app);

// Set token variables
const admin = {
  email: 'feggie@gmail.com',
  password: 'password',
};

describe('create new account', () => {
  it('should create a new account', async () => {
    const user = {
      firstName: 'George',
      lastName: 'Masoon',
      email: 'rico@gmail.com',
      password: 'pass',
      isAdmin: 'true',
    };
    const loginResponse = await server.post('/api/v1/auth/signin').send(admin);
    const {
      token
    } = loginResponse.body.data;
    const response = await server
      .post('/api/v1/auth/create-user')
      .send(user)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(201);
    expect(response.body.data).to.be.an('object');
  });
});

describe('create new account', () => {
  it('should not create an account if the email already exists', async () => {
    const user = {
      firstName: 'George',
      lastName: 'Masoon',
      email: 'rico@gmail.com',
      password: 'pass',
      isAdmin: 'true',
    };
    const loginResponse = await server.post('/api/v1/auth/signin').send(admin);
    const {
      token
    } = loginResponse.body.data;
    const response = await server
      .post('/api/v1/auth/create-user')
      .send(user)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(409);
    expect(response.body.error).to.equal(
      'An account with this email already exists'
    );
  });
});

// User sign in

describe('User sign in', () => {
  it('should sign in a user with the correct credentials', async () => {
    const user = {
      email: 'rico@gmail.com',
      password: 'pass',
    };
    const response = await server.post('/api/v1/auth/signin').send(user);
    expect(response.status).to.equal(200);
    expect(response.body.data).to.be.an('object');
  });
});

describe('User sign in', () => {
  it('should not sign in a non registered user', async () => {
    const user = {
      email: 'ricboo@gmail.com',
      password: 'pass',
    };
    const response = await server.post('/api/v1/auth/signin').send(user);
    expect(response.status).to.equal(401);
    expect(response.body.error).to.equal('User not found');
  });
});

describe('User sign in', () => {
  it('should not sign in a user with the wrong password', async () => {
    const user = {
      email: 'rico@gmail.com',
      password: 'password',
    };
    const response = await server.post('/api/v1/auth/signin').send(user);
    expect(response.status).to.equal(401);
    expect(response.body.error).to.equal('Wrong Password');
  });
});