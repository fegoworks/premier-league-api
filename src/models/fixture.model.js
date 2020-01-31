import query from './db/index';
import bcrypt from 'bcrypt';
import {
  uuid
} from 'uuidv4';

class FixtureModel {
  constructor(fixture) {
    this.fixtureId = fixture.fixtureId
    this.createdAt = fixture.createdAt
    this.createdBy = fixture.createdBy
    this.matchDate = fixture.matchDate
    this.homeTeam = fixture.homeTeam
    this.awayTeam = fixture.awayTeam
    this.homeTeamScore = fixture.homeTeamScore
    this.awayTeamScore = fixture.awayTeamScore
    this.modifiedAt = fixture.modifiedAt
    this.modifiedBy = fixture.modifiedBy
    this.status = fixture.status;
  }

  static async add(fixture, userid) {
    const {
      matchDate,
      homeTeam,
      awayTeam
    } = fixture
    try {
      const matchDay = new Date(matchDate)

      const status = "pending"
      const addQuery = `INSERT INTO
        fixtures("fixtureId", "createdBy", "matchDate", "homeTeam", "awayTeam", status)
        VALUES($1, $2, $3, $4, $5, $6)
        returning *`;

      const values = [
        uuid(),
        userid,
        matchDay,
        homeTeam,
        awayTeam,
        status
      ];

      const {
        rows
      } = await query(addQuery, values);
      const fixture = new FixtureModel(rows[0])

      return Promise.resolve(fixture)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  // static async findFixture(teamA, teamB) {
  //   const exists = `SELECT * FROM fixtures WHERE ("homeTeam"=$1 AND "awayTeam"=$2) `
  //   const values = [teamA, teamB]
  //   try {
  //     const {
  //       rows
  //     } = await query(exists, values)
  //     return Promise.resolve(rows[0])
  //   } catch (error) {
  //     return Promise.reject(error)
  //   }
  // }
}

export default FixtureModel