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

      return res.status(201).json({
        status: "success",
        message: `${savedTeam.teamName} added successfully`,
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

  /**
   * View A Team
   * @param {object} req
   * @param {object} res
   * @returns {object} team object
   */

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

  /**
   * Update A Team
   * @param {object} req
   * @param {object} res
   * @returns {object} team object
   */
  static async editTeam(req, res) {
    try {
      const teamId = req.params.id
      const team = req.body
      const editor = req.id
      const args = {
        teamId,
        team,
        editor
      }

      const found = await TeamModel.findById(teamId)

      if (found) {
        const updatedTeam = await TeamModel.edit(args)
        return res.status(200).json({
          status: "success",
          message: `${updatedTeam.teamName} updated successfully`,
          data: updatedTeam
        })
      }
      return res.status(404).json({
        status: 'Request failed',
        error: 'Team not found',
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

  /**
   * Delete Team
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   */
  static async deleteTeam(req, res) {
    try {
      const id = req.params.id
      const found = await TeamModel.findById(id)

      if (found) {
        const {
          rows
        } = await TeamModel.delete(id)
        return res.status(200).json({
          status: 'Success',
          data: {
            message: 'team successfully deleted',
            teamId: rows[0].teamId,
          },
        })
      }

      return res.status(404).json({
        message: 'team was not found',
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }
}

export default TeamController