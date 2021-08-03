const express = require('express');
const appartController = require('../controllers/appart'); 

const router  = express.Router();

router.get('/appart', appartController.getAll);
router.post('/appart', appartController.uploadImg, appartController.newItem);
router.delete('/appart', appartController.deleteAll);

router.get('/appart/:name', appartController.getOne);
router.patch('/appart/:name', appartController.updateOne);
router.post('/appart/:name', appartController.uploadImg, appartController.addACommentOnItem);
router.delete('/appart/:name', appartController.deleteOne);

module.exports = router;
