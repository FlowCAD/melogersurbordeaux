const express = require('express');
const jwt = require('jsonwebtoken');
const appartController = require('../controllers/appart');

const router  = express.Router();

router.get('/appart', verifyToken, appartController.getAll);
router.post('/appart', appartController.uploadImg, appartController.newItem);
router.delete('/appart', appartController.deleteAll);

router.get('/appart/:name', appartController.getOne);
router.patch('/appart/:name', appartController.updateOne);
router.post('/appart/:name', appartController.uploadImg, appartController.addACommentOnItem);
router.delete('/appart/:name', appartController.deleteOne);

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