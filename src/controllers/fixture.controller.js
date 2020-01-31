import FixtureModel from '../models/fixture.model';
import TeamModel from '../models/team.model';

class FixtureController {
  /**
   * Create A Team
   * @param {object} req
   * @param {object} res
   * @returns {object} team object
   */
  static async addFixture(req, res) {
    const user = req.id;
    const fixture = req.body;
    try {
      const createdFixture = await FixtureModel.add(fixture, user);

      return res.status(200).json({
        status: 'success',
        message: `"${createdFixture.homeTeam} vs ${createdFixture.awayTeam}" created successfully`,
        data: createdFixture,
      });
    } catch (error) {
      if (error.code === '23505') {
        return res.status(409).json({
          status: 'Request failed',
          error: 'This fixture already exists',
        });
      }
      return res.status(400).json({
        status: 'Request failed',
        error: error,
      });
    }
  }

  static async editFixture(req, res) {
    const fixtureId = req.params.id;
    const userId = req.id;
    const fixture = req.body;
    try {
      const args = {
        fixtureId,
        userId,
        fixture
      };
      const found = await FixtureModel.findById(fixtureId)

      if (found) {
        const updatedFixture = await FixtureModel.edit(args);

        return res.status(200).json({
          status: 'success',
          message: `Fixtures updated successfully`,
          data: updatedFixture,
        });
      }
      return res.status(400).json({
        status: 'Request failed',
        error: 'Fixture not found',
      })

    } catch (error) {
      if (error.code === '23505') {
        return res.status(409).json({
          status: 'Request failed',
          error: 'This fixture already exists',
        });
      } else if (error.code === '23503') {
        return res.status(409).json({
          status: 'Request failed',
          error: 'Wrong team credentials provided',
        });
      }
      return res.status(400).json({
        status: 'Request failed',
        error: error,
      });
    }
  }
}

export default FixtureController;