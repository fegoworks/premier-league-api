import query from './db/index'

import {
  uuid
} from 'uuidv4'

class TeamModel {
  constructor(team) {
    this.teamId = team.teamId;
    this.teamName = team.teamName;
    this.createdBy = team.createdBy;
    this.createdOn = team.createdOn;
  }

  static async add(team, userid) {
    team.createdBy = userid;
    const text = `INSERT INTO
        teams("teamId", "teamName", "createdBy")
        VALUES($1, $2, $3)
        returning *`;

    const values = [
      uuid(),
      team.teamName,
      team.createdBy
    ];

    try {
      const {
        rows
      } = await query(text, values);
      const newTeam = new TeamModel(rows[0])
      return Promise.resolve(newTeam);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async findById(id) {
    const text = ` SELECT * FROM teams WHERE "teamId"= $1 `;
    const value = [id]

    try {
      const {
        rows
      } = await query(text, value);
      const team = rows[0]
      return Promise.resolve(team);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default TeamModel