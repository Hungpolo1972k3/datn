const User = require('../model/user');
const CONFIG_STATUS = require('../configs/status.json');
const requireLogin = async (req, res, next) => {
    if (req.headers.authorization == undefined) {
      res.status(401).send({
        status: CONFIG_STATUS.TOKEN_EMPTY,
        message: 'Authorization is not exist.',
      });
    } else {
      const token = req.headers.authorization.split(' ')[1];
      var decodedToken = require('../utils/security').verifyToken(token);
  
      if (decodedToken.status == 403) {
        res.status(decodedToken.status);
        res.send(decodedToken);
      } else if (decodedToken.status == 200) {
        const userExist = await User.exists({ email: decodedToken.data.phone });
        if (userExist) {
          req.currentUser = decodedToken.data;
          next();
        } else {
          res.status(402).send({
            status: CONFIG_STATUS.TOKEN_ERROR,
            message: 'Unauthorized !!!',
          });
        }
      } else {
        res.status(402).send({
          status: CONFIG_STATUS.TOKEN_ERROR,
          message: 'Unauthorized !!!',
        });
      }
    }
  };

  module.exports = {
    requireLogin,
  };