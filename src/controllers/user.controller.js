import UserModel from '../models/user.model';

class UserController {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  static async createUser(req, res) {
    try {
      const user = await UserModel.create(req.body);

      return res.status(201).json({
        status: 'success',
        data: {
          message: 'User account successfully created',
          userId: user.userid,
        },
      });
    } catch (error) {
      if (error.code === '23505') {
        return res.status(409).json({
          status: 'Request failed',
          error: 'An account with this email already exists',
        });
      }
      return res.status(400).json({
        status: 'Request failed',
        error: error,
      });
    }
  }
}

export default UserController;
