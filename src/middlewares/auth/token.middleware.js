import jwt from 'jsonwebtoken'


const secret = process.env.SECRET;

const verifyToken = {
  verify(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(403).json({
        status: 403,
        error: 'No token provided. ',
      });
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(500).json({
          status: 500,
          error: 'Failed to authenticate token',
        });
      }

      // If everything is good, save to request for use in other routes
      req.id = decoded.id;
      req.isAdmin = decoded.isAdmin;
      return next();
    });
  },
};

export default verifyToken