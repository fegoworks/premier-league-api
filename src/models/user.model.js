import query from './db/index';
import bcrypt from 'bcrypt';
import {
  uuid
} from 'uuidv4';

class UserModel {
  constructor(user) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.role = user.isAdmin;
  }

  static async create(user) {
    let newUser = new UserModel(user);
    newUser = {
      ...user,
    };

    const {
      isAdmin
    } = newUser;

    if (isAdmin === 'false') {
      newUser.isAdmin = false;
    } else if (isAdmin === 'true') {
      newUser.isAdmin = true;
    }

    const hashedPassword = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hashedPassword;

    const text = `INSERT INTO
        users(userid, firstname, lastname, email, password, "isAdmin")
        VALUES($1, $2, $3, $4, $5, $6)
        returning *`;

    const values = [
      uuid(),
      newUser.firstName,
      newUser.lastName,
      newUser.email,
      newUser.password,
      newUser.isAdmin,
    ];

    try {
      const {
        rows
      } = await query(text, values);
      const savedUser = rows[0];
      return Promise.resolve(savedUser);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  static async findByEmail(email) {
    const text = ` SELECT * FROM Users WHERE email= $1 `;
    const value = [email]
    try {
      const {
        rows,
        rowCount
      } = await query(text, value);
      const result = {
        rows,
        rowCount
      };
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static async findById(id) {
    const text = ` SELECT * FROM Users WHERE userid= $1 `;
    const value = [id]

    try {
      const {
        rows
      } = await query(text, value);
      const result = rows[0]
      return Promise.resolve(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default UserModel;