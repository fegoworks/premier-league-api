import UserModel from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

  /**
   * Signs in user
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  static async signIn(req, res) {
    try {
      const {
        email,
        password
      } = req.body;
      const {
        rows,
        rowCount
      } = await UserModel.findByEmail(email);

      if (rowCount < 1) {
        return res.status(401).json({
          error: 'User not found',
        });
      }

      const {
        ...data
      } = rows[0];

      // Compare password with what's stored in the database
      const isMatch = bcrypt.compareSync(password, data.password);
      if (!isMatch) {
        return res.status(401).json({
          status: 'Request failed',
          error: 'Wrong Password',
        });
      }

      // Generate token
      const token = jwt.sign({
          id: data.userid,
          isAdmin: data.isAdmin,
        },
        process.env.SECRET, {
          expiresIn: 86400, // expires in 24 hours
        }
      );

      return res.status(200).json({
        status: 'success',
        message: `Welcome ${data.firstname}`,
        data: {
          token,
          userId: data.userid,
          firstName: data.firstname,
          lastName: data.lastname,
          email: data.email,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 'Request failed',
        error: 'Wrong Credentials',
      });
    }
  }
}

export default UserController;