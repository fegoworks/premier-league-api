# Mock EPL API

[![Coverage Status](https://coveralls.io/repos/github/fegoworks/premier-league-api/badge.svg?branch=develop&service=github)](https://coveralls.io/github/fegoworks/premier-league-api?branch=develop)
[![Build Status](https://travis-ci.org/fegoworks/premier-league-api.svg?branch=develop)](https://travis-ci.org/fegoworks/premier-league-api)

An API that serves the latest scores of fixtures of matches in a “Mock Premier League”

# Table of Contents

- [Technology Stack](#tstack)
- [Features](#features)
- [Getting Started](#started)
- [Pre-requisites](#require)
- [Installation](#installation)
- [Running tests](#tests)
- [API Endpoints](#endpoints)

## Technology Stack<a name="tstack"></a>

- Nodejs
- PostgreSQL
- Redis
- Docker

## Features<a name="features"></a>

- Users can
  - Sign in
  - view teams
  - view completed fixtures
  - view pending fixtures
  - search fixtures/teams
- Admin can
  - Sign in
  - manage teams (add, remove, edit, view)
  - create fixtures (add, remove, edit, view)

## Getting Started<a name="started"></a>

To run this API locally simply follow the instructions below:

#### Prerequisites<a name="require"></a>

You need to have or install the following:

1. Git bash
2. Npm
3. Postman

#### Installation<a name="installation"></a>

- clone repo
  ```
  git clone https://github.com/fegoworks/premier-league-api.git
  ```
- navigate to api folder
- run installation
  ```
  npm install
  ```
- create a `.env` file with this template

  ```
  DB_URL='Your postgres database url'
  TEST_URL='Your postgres test database url'
  SECRET = 'Your secret phrase'
  ```

- start app
  ```
  npm run start:dev
  ```
- you can now make requests using postman to `localhost:3000/api/v1/`

## Running Tests<a name="tests"></a>

To run tests simply run the following command in your git bash or command line

```
npm run test
```

### API endpoints

Heroku: [Mock-EPL-API](https://mockepl-fg.herokuapp.com/)
Documentation: [Mock-EPL-API-Docs]()

| Endpoints                         | Functionality                |
| --------------------------------- | ---------------------------- |
| POST /auth/create-user            | Create new user account      |
| POST /auth/signin                 | Login a user                 |
| POST /teams                       | Create a team                |
| POST /fixtures                    | Create a fixture             |
| PATCH /teams/:teamId              | Edit a team                  |
| PATCH /fixtures/:fixtureId        | Edit a fixture               |
| PATCH /fixtures/:fixtureId/scores | Update a fixture with scores |
| DELETE /fixtures/:fixtureId       | Delete a specific fixture    |
| DELETE /teams/:teamId             | Delete a specific team post  |
| GET /fixtures/pending             | View pending fixtures        |
| GET /fixtures/completed           | View completed fixtures      |
| GET /fixtures/:fixtureId          | View a specific fixture      |
| GET /teams/:teamId                | View a specific team         |

### Sign up<a name="endpoints"></a>

Send a `POST` request to `/api/v1/auth/create-user` with the following JSON structure:

```json
{
  "firstName": "Sensei",
  "lastName": "Saitama",
  "email": "saitama@mail.com",
  "password": "password",
  "isAdmin": "true"
}
```

For admins `isAdmin` is provided with `true` while for users it is set to `false`. `POST` and `PATCH` requests are restricted to only the admin accounts. User accounts can perform `GET` requests.

### Sign in with the user

Send a `POST` request to `/api/v1/auth/signin`, with the following:

```json
{
	"email": ,
	"password":
}
```

When you signin you'll receive a `Bearer token`. You'll need this token to send any request related to teams and fixtures.

> Frow now on, every request described here will require you send
> the Bearer token

### Create a new team

Send a `POST` request to `/api/v1/teams`, with the following:

```json
{
  "teamName": "Barcelona"
}
```

### View a single team

Send a `GET` request to `/api/v1/teams/:teamid`

### Edit a team

Send a `PATCH` request to `/api/v1/teams/:teamid`, with the following:

```json
{
  "teamName": "Norwich"
}
```

### Delete a team

Delete a team by placing its id in the `DELETE` request URL
`/api/v1/teams/:teamid`.

### Create a fixture

Send a `POST` request to `/fixtures`, with the following:

```json
{
  "matchDate": "03/10/2020",
  "homeTeam": "Crystal Palace",
  "awayTeam": "Chelsea"
}
```

### Edit a fixture

Send a `PATCH` request to `/api/v1/fixtures/:fixtureId`, with the following:

```json
{
  "matchDate": "03/10/2020",
  "homeTeam": "Crystal Palace",
  "awayTeam": "Chelsea"
}
```

### View a single fixture

Send a `GET` request to `/api/v1/fixtures/:fixtureid`

### Delete a fixture

Delete a fixture by placing its id in the `DELETE` request URL
`/fixtures/:fixtureid`.

### Update a fixture with scores

Send a `PATCH` request to `/api/v1/fixtures/:fixtureId/scores`, with the following:

```json
{
  "homeTeamScore": 5,
  "awayTeamScore": 2
}
```

### View pending fixtures

Send a `GET` request to `/api/v1/fixtures/pending/`

### View completed fixtures

Send a `GET` request to `/api/v1/fixtures/completed`

## Author

Edafe Oghenefego
[@realFego](https://twitter.com/realFego)
