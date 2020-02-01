import query from './db/index';
import bcrypt from 'bcrypt';
import {
  uuid
} from 'uuidv4';

class FixtureModel {
  constructor(fixture) {
    this.fixtureId = fixture.fixtureId;
    this.createdAt = fixture.createdAt;
    this.createdBy = fixture.createdBy;
    this.matchDate = fixture.matchDate;
    this.homeTeam = fixture.homeTeam;
    this.awayTeam = fixture.awayTeam;
    this.homeTeamScore = fixture.homeTeamScore;
    this.awayTeamScore = fixture.awayTeamScore;
    this.modifiedAt = fixture.modifiedAt;
    this.modifiedBy = fixture.modifiedBy;
    this.status = fixture.status;
  }

  static async add(fixture, userid) {
    const {
      matchDate,
      homeTeam,
      awayTeam
    } = fixture;
    try {
      const matchDay = new Date(matchDate)

      const status = 'pending';
      const addQuery = `INSERT INTO
        fixtures("fixtureId", "createdBy", "matchDate", "homeTeam", "awayTeam", status)
        VALUES($1, $2, $3, $4, $5, $6)
        returning *`;

      const values = [uuid(), userid, matchDay, homeTeam, awayTeam, status];

      const {
        rows
      } = await query(addQuery, values);
      const fixture = new FixtureModel(rows[0]);

      return Promise.resolve(fixture);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async edit(args) {
    const {
      fixtureId,
      userId,
      fixture
    } = args

    const {
      matchDate,
      homeTeam,
      awayTeam,
    } = fixture;

    fixture.modifiedBy = userId;
    fixture.modifiedAt = new Date();

    try {
      const updateQuery = `UPDATE fixtures
    SET "matchDate"=$1,"homeTeam"=$2,"awayTeam"=$3, 
    "modifiedBy"=$4,"modifiedAt"=$5
    WHERE "fixtureId"=$6 returning *`;

      const values = [
        matchDate,
        homeTeam,
        awayTeam,
        fixture.modifiedBy,
        fixture.modifiedAt,
        fixtureId
      ];

      const {
        rows
      } = await query(updateQuery, values);

      return Promise.resolve(rows[0]);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async addScore(args) {
    const {
      fixtureId,
      userId,
      fixture
    } = args

    const {
      homeTeamScore,
      awayTeamScore,
    } = fixture;

    fixture.modifiedBy = userId;
    fixture.modifiedAt = new Date();
    const status = 'completed';

    try {
      const updateQuery = `UPDATE fixtures
    SET "homeTeamScore"=$1,"awayTeamScore"=$2, "modifiedBy"=$3,
    "modifiedAt"=$4, status=$5
    WHERE "fixtureId"=$6 returning *`;

      const values = [
        homeTeamScore,
        awayTeamScore,
        fixture.modifiedBy,
        fixture.modifiedAt,
        status,
        fixtureId
      ];

      const {
        rows
      } = await query(updateQuery, values);

      return Promise.resolve(rows[0]);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async findById(id) {
    const text = `SELECT * FROM fixtures WHERE "fixtureId"=$1 `
    const value = [id]
    try {
      const {
        rows
      } = await query(text, value)
      return Promise.resolve(rows[0])
    } catch (error) {
      return Promise.reject(error)
    }
  }

  static async findByStatus(status) {
    const text = `SELECT * FROM fixtures WHERE status=$1 `
    const value = [status]
    try {
      const {
        rows
      } = await query(text, value)
      return Promise.resolve(rows)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  static async delete(id) {
    try {
      const deleteQuery = `DELETE FROM fixtures WHERE "fixtureId"=$1 returning *`
      const value = [id]
      const deleteFixture = await query(deleteQuery, value);
      return Promise.resolve(deleteFixture)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default FixtureModel;