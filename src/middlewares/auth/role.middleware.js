const permissions = {
  adminOnly(req, res, next) {
    if (req.isAdmin === true) {
      return next();
    }
    return res.json({
      status: 403,
      error: 'Unauthorized Access',
    });
  },
};

export default permissions