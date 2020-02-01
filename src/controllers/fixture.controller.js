import FixtureModel from '../models/fixture.model';

class FixtureController {
  /**
   * Create A Fixture
   * @param {object} req
   * @param {object} res
   * @returns {object} fixture object
   */
  static async addFixture(req, res) {
    const user = req.id;
    const fixture = req.body;
    try {
      const createdFixture = await FixtureModel.add(fixture, user);

      return res.status(201).json({
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

  /**
   * View A Fixture
   * @param {object} req
   * @param {object} res
   * @returns {object} fixture object
   */
  static async viewFixture(req, res) {
    try {
      const id = req.params.id
      const fixture = await FixtureModel.findById(id)
      if (fixture) {
        return res.status(200).json({
          status: "success",
          data: fixture
        })
      }
      return res.status(404).json({
        status: 'Not found',
        error: 'Fixture not found in the database'
      })
    } catch (error) {
      return res.status(400).json({
        status: 'Request failed',
        error: error,
      });
    }
  }

  /**
   * Update A fixture
   * @param {object} req
   * @param {object} res
   * @returns {object} fixture object
   */
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
        console.log(updatedFixture);

        return res.status(200).json({
          status: 'success',
          message: `Fixtures updated successfully`,
          data: updatedFixture,
        });
      }
      return res.status(404).json({
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

  /** 
   * Update A fixture
   * @param {object} req
   * @param {object} res
   * @returns {object} fixture object
   */
  static async addScore(req, res) {
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
        const updatedWithScores = await FixtureModel.addScore(args);

        return res.status(200).json({
          status: 'success',
          message: `Scores updated successfully`,
          data: updatedWithScores,
        });
      }
      return res.status(400).json({
        status: 'Request failed',
        error: 'Fixture not found',
      })

    } catch (error) {
      return res.status(400).json({
        status: 'Request failed',
        error: error,
      });
    }
  }

  /**
   * Delete Fixture
   * @param {object} req
   * @param {object} res
   * @returns {void} return status code 204
   */
  static async deleteFixture(req, res) {
    try {
      const id = req.params.id
      const found = await FixtureModel.findById(id)

      if (found) {
        const {
          rows
        } = await FixtureModel.delete(id)
        return res.status(200).json({
          status: 'Success',
          data: {
            message: 'Fixture successfully deleted',
            fixtureId: rows[0].fixtureId,
          },
        })
      }

      return res.status(404).json({
        message: 'Fixture was not found',
      })
    } catch (error) {
      return res.status(400).send(error)
    }
  }

  /** 
   * Get Fixtures
   * @param {object} req
   * @param {object} res
   * @returns [array] fixtures array
   */
  static async getFixturesByStatus(req, res) {
    try {
      const path = req.path

      let status = ""
      if (path.includes("pending")) {
        status = "pending"
      } else {
        status = "completed"
      }

      const fixtures = await FixtureModel.findByStatus(status)

      if (fixtures.length > 0) {
        return res.status(200).json({
          status: "success",
          data: fixtures
        })
      }
      return res.status(404).json({
        status: 'Not found',
        error: `No ${status} fixtures`
      })
    } catch (error) {
      return res.status(400).json({
        status: 'Request failed',
        error: error,
      });
    }
  }

}

export default FixtureController;