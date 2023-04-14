const express = require('express');
const jwt = require('jsonwebtoken');
const appartController = require('../controllers/appart');

const router = express.Router();

router.get('/appart', verifyToken, appartController.getAll);
router.post('/appart', verifyToken, appartController.uploadImg, appartController.newItem);
router.delete('/appart', verifyToken, appartController.deleteAll);

router.get('/appart/:code', verifyToken, appartController.getOne);
router.patch('/appart/:code', verifyToken, appartController.updateOne);
router.post('/appart/:code', verifyToken, appartController.uploadImg, appartController.addACommentOnItem);
router.delete('/appart/:code', verifyToken, appartController.deleteOne);

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