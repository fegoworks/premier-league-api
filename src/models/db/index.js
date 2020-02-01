import {
  Pool
} from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.TEST_URL,
});

pool.on('connect', () => {
  console.log('connected to the database');
});

/**
 * DB Query
 * @param {object} req
 * @param {object} res
 * @returns {object} object
 */
const query = (text, params) =>
  new Promise((resolve, reject) => {
    pool
      .query(text, params)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });

export default query;