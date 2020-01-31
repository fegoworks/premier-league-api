const {
  Pool
} = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.TEST_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const insertAllTables = () => {
  const text = `
  INSERT INTO users(
    userid,
    firstname,
    lastname,
    email,
    password,
    "isAdmin"
    ) 
    VALUES (
      '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
      'Fego',
      'Edafe',
      'feggie@gmail.com',
      '$2b$10$aTDxopZ9dyNDTKbogeQp4.CP4czGuBQqzmpSpkBr0dboEVRgYzMP2',
      'true'
      ),
      (
        '65863249-4600-4dd6-b601-7e1947b51bc8',
        'Adesuwa',
        'George',
        'adesuwageorge@gmail.com',
        '$2b$10$aTDxopZ9dyNDTKbogeQp4.CP4czGuBQqzmpSpkBr0dboEVRgYzMP2',
        'true'
      ),
      (
        'ee03e6c4-7402-4ddf-84d8-e971d74ee152',
        'Sai',
        'Tama',
        'saitama@gmail.com',
        '$2b$10$aTDxopZ9dyNDTKbogeQp4.CP4czGuBQqzmpSpkBr0dboEVRgYzMP2',
        'false'
      );

      INSERT INTO teams(
        "teamId",
        "teamName" ,
        "createdBy",
        "createdOn" ,
        "modifiedBy",
        "modifiedOn"
        ) VALUES
         (
          '1ec9a90e-dd68-4171-9c4c-e00ca0da5be3',
          'Liverpool',
          '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
          '2020-01-29T14:34:45.735Z',
          '65863249-4600-4dd6-b601-7e1947b51bc8',
          '2020-01-29T14:34:45.735Z'
          ),
          (
            '99586612-b7d3-48dc-8831-2405b1766600',
            'Arsenal',
            '65863249-4600-4dd6-b601-7e1947b51bc8',
            '2020-01-29T14:34:45.735Z',
            '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
            '2020-01-29T14:34:45.735Z'
          ),
          (
            '14fc2435-10c7-48ac-b046-67da4bb0f1ee',
            'Chelsea',
            '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
            '2020-01-29T14:34:45.735Z',
            '65863249-4600-4dd6-b601-7e1947b51bc8',
            '2020-01-29T14:34:45.735Z'
          ),
          (
            '17fc2435-10c7-48ac-b046-67da4bb0f1ee',
            'Manchester City',
            '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
            '2020-01-29T14:34:45.735Z',
            '65863249-4600-4dd6-b601-7e1947b51bc8',
            '2020-01-29T14:34:45.735Z'
          ),
          (
            '27fc2435-10c7-48ac-b046-67da4bb0f1ee',
            'Manchester United',
            '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
            '2020-01-29T14:34:45.735Z',
            '65863249-4600-4dd6-b601-7e1947b51bc8',
            '2020-01-29T14:34:45.735Z'
          ),
          (
            '17fc2495-10c7-48ac-b046-67da4bb0f1ee',
            'Crystal Palace',
            '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
            '2020-01-29T14:34:45.735Z',
            '65863249-4600-4dd6-b601-7e1947b51bc8',
            '2020-01-29T14:34:45.735Z'
          ),
          (
            '17fc2535-10c7-48ac-b046-67da4bb0f1ee',
            'Tottenham Hotspurs',
            '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
            '2020-01-29T14:34:45.735Z',
            '65863249-4600-4dd6-b601-7e1947b51bc8',
            '2020-01-29T14:34:45.735Z'
          ),
          (
            '17fc2435-10c7-88ac-b046-67da4bb0f1ee',
            'West Ham',
            '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
            '2020-01-29T14:34:45.735Z',
            '65863249-4600-4dd6-b601-7e1947b51bc8',
            '2020-01-29T14:34:45.735Z'
          ),
          (
            '17fc2435-10c7-48ac-b036-67da4bb0f1ee',
            'Southampton',
            '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
            '2020-01-29T14:34:45.735Z',
            '65863249-4600-4dd6-b601-7e1947b51bc8',
            '2020-01-29T14:34:45.735Z'
          ),
          (
            '17fc2435-10c7-48ac-b046-67da4bb0f2ee',
            'Wolves',
            '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
            '2020-01-29T14:34:45.735Z',
            '65863249-4600-4dd6-b601-7e1947b51bc8',
            '2020-01-29T14:34:45.735Z'
          )
          ;

      INSERT INTO fixtures(
        "fixtureId",
        "createdAt",
        "createdBy",
        "matchDate",
        "homeTeam",
        "awayTeam",
        "homeTeamScore",
        "awayTeamScore",
        "modifiedAt",
        "modifiedBy",
        status 
        ) 
        VALUES (
          '80987064-d7b0-470b-ab9c-6d9954060fdf',
          '2020-01-29T14:34:45.735Z',
          '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
          '2020-01-29T14:34:45.735Z',
          'Liverpool',
          'Arsenal',
          '0',
          '0',
          '2020-01-29T14:34:45.735Z',
          '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
          'pending'
          ),
          (
            '78853b1d-38fd-4297-ab70-48545e091d0b',
            '2020-01-29T14:34:45.735Z',
            '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
            '2020-01-29T14:34:45.735Z',
            'Liverpool',
            'Manchester City',
            '0',
            '0',
            '2020-01-29T14:34:45.735Z',
            '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
            'pending'        
          ),
          (
            'c389140c-6bce-4001-a29c-7fd69d9c45d0',
            '2020-01-29T14:34:45.735Z',
            '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
            '2020-01-29T14:34:45.735Z',
            'Liverpool',
            'Crystal Palace',
            '0',
            '0',
            '2020-01-29T14:34:45.735Z',
            '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
            'pending'
          ),
          (
            'c387140c-6bce-4001-a29c-7fd69d9c45d0',
            '2020-01-29T14:34:45.735Z',
            '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
            '2020-01-29T14:34:45.735Z',
            'Arsenal',
            'Crystal Palace',
            '0',
            '0',
            '2020-01-29T14:34:45.735Z',
            '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
            'pending'
          ),
          (
            'c389240c-6bce-4001-a29c-7fd69d9c45d0',
            '2020-01-29T14:34:45.735Z',
            '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
            '2020-01-29T14:34:45.735Z',
            'Manchester City',
            'Crystal Palace',
            '0',
            '0',
            '2020-01-29T14:34:45.735Z',
            '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
            'pending'
          ),
          (
            'c389140c-6bce-4301-a29c-7fd69d9c45d0',
            '2020-01-29T14:34:45.735Z',
            '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
            '2020-01-29T14:34:45.735Z',
            'West Ham',
            'Crystal Palace',
            '0',
            '0',
            '2020-01-29T14:34:45.735Z',
            '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
            'pending'
          ),
          (
            'c389140c-6bce-4001-a29c-7fd77d9c45d0',
            '2020-01-29T14:34:45.735Z',
            '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
            '2020-01-29T14:34:45.735Z',
            'Chelsea',
            'Crystal Palace',
            '0',
            '0',
            '2020-01-29T14:34:45.735Z',
            '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
            'pending'
          ),
          (
            'c389140c-5bce-4001-a29c-7fd69d9c45d0',
            '2020-01-29T14:34:45.735Z',
            '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
            '2020-01-29T14:34:45.735Z',
            'Manchester United',
            'Crystal Palace',
            '0',
            '0',
            '2020-01-29T14:34:45.735Z',
            '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
            'pending'
          ), 
          (
            'c389140c-6bce-4221-a29c-7fd69d9c45d0',
            '2020-01-29T14:34:45.735Z',
            '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
            '2020-01-29T14:34:45.735Z',
            'Manchester United',
            'Liverpool',
            '0',
            '0',
            '2020-01-29T14:34:45.735Z',
            '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
            'pending'
          ),
          (
            'c389140c-6bce-4001-a33c-7fd69d9c45d0',
            '2020-01-29T14:34:45.735Z',
            '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
            '2020-01-29T14:34:45.735Z',
            'Manchester United',
            'Southampton',
            '0',
            '0',
            '2020-01-29T14:34:45.735Z',
            '6f3f2422-5394-41e2-a1ba-1a62d16bfc59',
            'pending'
          ); 
  `;
  pool
    .query(text)
    .then(() => {
      pool.end();
    })
    .catch(e => console.log(e));
};

insertAllTables();