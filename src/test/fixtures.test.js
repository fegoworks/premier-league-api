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
// fixture
const fixtureId = 'c389140c-6bce-4001-a29c-7fd69d9c45d0';

// Create fixtures
describe('create fixtures', () => {
  it('should create a fixture if a user is signed in', async () => {
    const fixture = {
      matchDate: '05/02/2020',
      homeTeam: 'Southampton',
      awayTeam: 'Chelsea'
    };
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;
    const response = await server
      .post('/api/v1/fixtures/')
      .send(fixture)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(201);
    expect(response.body.data).to.be.an('object');
  });
});

describe('create fixtures', () => {
  it('should not create a fixture if the user is not signed in', async () => {
    const fixture = {
      matchDate: '05/02/2020',
      homeTeam: 'Bayern',
      awayTeam: 'Manchester'
    };
    const token = ' ';

    const response = await server
      .post('/api/v1/fixtures/')
      .set('authorization', `Bearer ${token}`)
      .send(fixture);
    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal('No token provided. ');
  });
});

describe('create fixtures', () => {
  it('should not create a fixture if team field is empty', async () => {
    const fixture = {
      matchDate: '05/02/2020',
      homeTeam: '',
      awayTeam: 'Manchester'
    };
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;
    const response = await server
      .post('/api/v1/fixtures/')
      .send(fixture)
      .set('authorization', `Bearer ${token}`);
    expect(response.body.status).to.equal(400);
    expect(response.body.error).to.equal('Home team is required');
  });
});


// Get fixtures
describe('Get a fixture by its id', () => {
  it('should get a fixture if signed in ', async () => {
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;

    const response = await server
      .get(`/api/v1/fixtures/${fixtureId}`)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('success');
    expect(response.body.data).to.be.an('Object');
  });
});

describe('Get a fixture by its id', () => {
  it('should not get a fixture if not signed in ', async () => {
    const token = '';

    const response = await server
      .get(`/api/v1/fixtures/${fixtureId}`)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal('No token provided. ');
  });
});

// Update a fixture

describe('Update a fixture', () => {
  it('should be able to update a fixture if signed in ', async () => {
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const fixture2 = 'c389140c-6bce-4001-a29c-7fd77d9c45d0'
    const {
      token,
    } = loginResponse.body.data;

    const fixture = {
      matchDate: '05/02/2020',
      homeTeam: 'Chelsea',
      awayTeam: 'Crystal Palace'
    };

    const response = await server
      .patch(`/api/v1/fixtures/${fixture2}`)
      .set('authorization', `Bearer ${token}`)
      .send(fixture);
    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('success');
    expect(response.body.data).to.be.an('Object');
  });
});


describe('Update a fixture', () => {
  it('should not be able to update a non existent fixture', async () => {
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;

    const fixture = {
      matchDate: '05/02/2020',
      homeTeam: 'Chelsea',
      awayTeam: 'Crystal Palace'
    };

    const response = await server
      .patch('/api/v1/fixtures/6f3f2429-5394-41e2-a1ba-1a62d16bfc59')
      .set('authorization', `Bearer ${token}`)
      .send(fixture);
    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('fixture not found');
  });
});

// Delete fixture

describe('Delete a fixture', () => {
  it('should be able to delete a fixture when signed in', async () => {
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;

    const response = await server
      .delete(`/api/v1/fixtures/c389140c-6bce-4001-a29c-7fd77d9c45d0`)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(200);
    expect(response.body.data.message).to.equal('Fixture successfully deleted');
  });
});

describe('Delete a fixture', () => {
  it('should not be able to delete a non existent fixture', async () => {
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;

    const response = await server
      .delete(`/api/v1/fixtures/6f3f2422-5394-41e2-a1ba-1a62d16bfc59`)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('Fixture was not found');
  });
});


describe('Delete a fixture', () => {
  it('should not be able to delete a fixture if not signed in', async () => {
    const token = '';

    const response = await server
      .delete(`/api/v1/fixtures/${fixtureId}`)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal('No token provided. ');
  });
});

// Get pending fixtures
describe('Get a fixture by its status', () => {
  it('should get a fixture if signed in ', async () => {
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;

    const response = await server
      .get(`/api/v1/fixtures/pending`)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('success');
    expect(response.body.data).to.be.an('Array');
  });
});

describe('Get a fixture by its status', () => {
  it('should not be able to get fixtures if not signed in ', async () => {
    const token = ''

    const response = await server
      .get(`/api/v1/fixtures/pending/`)
      .set('authorization', `Bearer ${token}`)
    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal('No token provided. ');
  });
});

// Get completed fixtures
describe('Get a fixture by its status', () => {
  it('should get a fixture if signed in ', async () => {
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;

    const response = await server
      .get(`/api/v1/fixtures/completed`)
      .set('authorization', `Bearer ${token}`);
    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('success');
    expect(response.body.data).to.be.an('Array');
  });
});

describe('Get a fixture by its status', () => {
  it('should not be able to get fixtures if not signed in ', async () => {
    const token = ''

    const response = await server
      .get(`/api/v1/fixtures/completed/`)
      .set('authorization', `Bearer ${token}`)
    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal('No token provided. ');
  });
});

// Update fixtures with scores
describe('Update Fixtures with scores', () => {
  it('should be able to update scores if signed in ', async () => {
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;

    const scores = {
      homeTeamScore: 5,
      awayTeamScore: 3
    };

    const response = await server
      .patch(`/api/v1/fixtures/c389140c-6bce-4221-a29c-7fd69d9c45d0/scores`)
      .set('authorization', `Bearer ${token}`)
      .send(scores);
    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal('success');
    expect(response.body.data).to.be.an('Object');
  });
});

describe('Update Fixtures with scores', () => {
  it('should not be able to update scores if scores are empty ', async () => {
    const loginResponse = await server.post('/api/v1/auth/signin').send(user);
    const {
      token,
    } = loginResponse.body.data;

    const scores = {
      homeTeamScore: '',
      awayTeamScore: ''
    };

    const response = await server
      .patch(`/api/v1/fixtures/c389140c-6bce-4221-a29c-7fd69d9c45d0/scores`)
      .set('authorization', `Bearer ${token}`)
      .send(scores);
    expect(response.body.status).to.equal(400);
    expect(response.body.error).to.equal('Home score is required');
  });
});

describe('Update Fixtures with scores', () => {
  it('should not be able to update scores if not signed in ', async () => {
    const token = ''

    const scores = {
      homeTeamScore: 5,
      awayTeamScore: 3
    };

    const response = await server
      .patch(`/api/v1/fixtures/c389140c-6bce-4221-a29c-7fd69d9c45d0/scores`)
      .set('authorization', `Bearer ${token}`)
      .send(scores);
    expect(response.status).to.equal(403);
    expect(response.body.error).to.equal('No token provided. ');
  });
});