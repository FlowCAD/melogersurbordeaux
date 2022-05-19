const express = require('express');
const jwt = require('jsonwebtoken');
const districtController = require('../controllers/district');

const router  = express.Router();

router.get('/district', verifyToken, districtController.getAll);

module.exports = router;


/* MIDDLEWARE */
function verifyToken(req, res, next) {
  try {
    let token = req.headers.authorization.split(' ')[1];
    let payload = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = payload.subject;
    next();
  } catch (err) {
    return res.status(401).send('Unauthorized request');
  }
}
/* END MIDDLEWARE */