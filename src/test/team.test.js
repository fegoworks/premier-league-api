import supertest from 'supertest';
import chai from 'chai';

const {
  expect
} = chai;

import app from '../app';

const server = supertest(app);

const user = {
  email: 'feggie@gmail.com',
  password: 'password',
};

const anonymous = {
  email: 'adesuwageorge@gmail.com',
  password: 'password',
};
// Team
const teamId = '1ec9a90e-dd68-4171-9c4c-e00ca0da5be3';
const teamName = 'Dortmund';

// Create teams
describe('create teams', () => {
  it('should create an team if a user is signed in', async () => {
    const team = {
      teamName: 'Bayern'
    };
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;
    const response = await server
      .post('/api/v1/teams/')
      .send(team)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(201);
    expect(response.body.data).to.be.an('object');
  });
});

describe('create teams', () => {
  it('should not create a team if the user is not signed in', async () => {
    const team = {
      teamName: 'Bayern'
    };
    const token = ' ';

    const response = await server
      .post('/api/v1/teams/')
      .set('authorization', `Bearer ${token}`)
      .send(team);
    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal('No token provided. ');
  });
});

describe('create teams', () => {
  it('should not create a team if name field is empty', async () => {
    const team = {
      teamName: ''
    };
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;
    const response = await server
      .post('/api/v1/teams/')
      .send(team)
      .set('authorization', `Bearer ${token}`);
    expect(response.body.status).to.equal(400);
    expect(response.body.error).to.equal('A team name is required');
  });
});


// Get teams
describe('Get a team by its id', () => {
  it('should get a team if signed in ', async () => {
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;

    const response = await server
      .get(`/api/v1/teams/${teamId}`)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('success');
    expect(response.body.data).to.be.an('Object');
  });
});

describe('Get a team by its id', () => {
  it('should not get an team if not signed in ', async () => {
    const token = '';

    const response = await server
      .get(`/api/v1/teams/${teamId}`)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal('No token provided. ');
  });
});

// Update a team

describe('Update a team', () => {
  it('should be able to update a team if signed in ', async () => {
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const team2 = '17fc2435-10c7-48ac-b036-67da4bb0f1ee'
    const {
      token,
    } = loginResponse.body.data;

    const team = {
      teamName: 'Lyon'
    };

    const response = await server
      .patch(`/api/v1/teams/${team2}`)
      .set('authorization', `Bearer ${token}`)
      .send(team);
    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('success');
    expect(response.body.data).to.be.an('Object');
  });
});


describe('Update a team', () => {
  it('should not be able to update a non existent team', async () => {
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;

    const team = {
      teamName: 'Ciroco'
    };

    const response = await server
      .patch('/api/v1/teams/6f3f2422-5394-41e2-a1ba-1a62d16bfc59')
      .set('authorization', `Bearer ${token}`)
      .send(team);
    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('Team not found');
  });
});

// Delete team

describe('Delete a team', () => {
  it('should be able to delete a team when signed in', async () => {
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;

    const response = await server
      .delete(`/api/v1/teams/17fc2435-10c7-88ac-b046-67da4bb0f1ee`)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(200);
    expect(response.body.data.message).to.equal('team successfully deleted');
  });
});

describe('Delete a team', () => {
  it('should not be able to delete a non existent team', async () => {
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;

    const response = await server
      .delete(`/api/v1/teams/6f3f2422-5394-41e2-a1ba-1a62d16bfc59`)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('team was not found');
  });
});


describe('Delete a team', () => {
  it('should not be able to delete a team if not signed in', async () => {
    const token = '';

    const response = await server
      .delete(`/api/v1/teams/${teamId}`)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal('No token provided. ');
  });
});