import TeamModel from '../models/team.model'

class TeamController {
  /**
   * Create A Team
   * @param {object} req
   * @param {object} res
   * @returns {object} team object
   */
  static async addTeam(req, res) {
    try {
      const team = req.body
      const owner = req.id

      const savedTeam = await TeamModel.add(team, owner)

      return res.status(200).json({
        status: "success",
        message: `${savedTeam.name} added successfully`,
        data: savedTeam
      })
    } catch (error) {
      if (error.code === '23505') {
        return res.status(409).json({
          status: 'Request failed',
          error: 'A team with this name already exists',
        });
      }
      return res.status(400).json({
        status: 'Request failed',
        error: error,
      });
    }
  }

  static async viewTeam(req, res) {
    try {
      const teamId = req.params.id
      console.log(teamId);

      const found = await TeamModel.findById(teamId)
      console.log(found);


      if (!found) {
        return res.status(404).json({
          status: 'Not found',
          error: 'Team not found in the database'
        })
      } else {
        return res.status(200).json({
          status: 'success',
          data: found
        })
      }

    } catch (error) {
      return res.status(400).json({
        status: 'Request failed',
        error: error,
      });
    }
  }
}

export default TeamController