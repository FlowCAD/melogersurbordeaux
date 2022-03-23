const { Appart } = require('../models');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  }
});

const uploadImg = multer({storage: storage}).single('image');


//GET '/appart'
const getAll = (req, res) => {
  Appart.find({})
    .then(data => res.json(data))
    .catch(err => {
      console.error(err);
      res.json({Error: err});
    }
  );
};

//POST '/appart'
const newItem = (req, res) => {
  const newAppart = new Appart({
    name: req.body.name,
    description: req.body.description,
    image: req.file.path,
    comments: req.body.comments
  });

  newAppart.save()
    .then(data => res.json(data))
    .catch(err => {
      console.error(err);
      res.json({Error: err});
    }
  );
};

//DELETE '/appart'
const deleteAll = (req, res) => {
  fs.readdir('uploads', (err, files) => {
    if (err) console.log(err);
    for (const file of files) {
      fs.unlink(path.join('uploads', file), error => {
        if (error) console.log(error);
      });
    }
  });
  Appart.deleteMany({})
    .then(() => res.json({message: 'Complete delete successful'}) )
    .catch(() => res.json({Error: 'Complete delete failed'}) );
};

//GET '/appart/:code'
const getOne = (req, res) => {
  Appart.findOne({code: req.params.code})
    .then(data => {
      if (data) {
        res.json(data);
      } else {
        res.sendStatus(404);
      }
    })
    .catch(err => {
      console.error(err);
      res.json({Error: err});
    }
  );
};

//PATCH '/appart/:code'
const updateOne = (req, res) => {
  Appart.findOneAndUpdate({code: req.params.code}, {$set: req.body})
    .then(() => res.send({message: 'Updated successfully'}))
    .catch(err => res.send(err));
};

//POST '/appart/:code'
const addACommentOnItem = (req, res) => {
  const commentText = req.body.comment;
  const comment = {
    text: commentText,
    date: new Date()
  };

  Appart.findOne({code: req.params.code})
    .then(data => {
      if (data) {
        if (commentText) {
          data.comments.push(comment);
          data.save()
            .then(data => res.json(data))
            .catch(err => res.json({message: 'Comment failed to add.', error: err}) );
        } else {
          res.sendStatus(400);
        }
      } else {
        res.sendStatus(404);
      }
    })
    .catch(err => {
      console.error(err);
      res.json({Error: err});
    }
  );
};

//DELETE '/appart/:code'
const deleteOne = (req, res) => {
  Appart.findOne({ code: req.params.code })
    .then(data => {
      if (data.image !== null) {
        fs.unlink(data.image, err => {
          if (err) {
            console.error(err);
            return;
          }

          Appart.deleteOne({code: req.params.code})
            .then(data => {
              if (data.n === 0) {
                res.sendStatus(404);
              } else {
                res.json({message: "Appart deleted."});
              }
            })
            .catch(err => {
              console.error(err);
              res.json({Error: err});
            });
        });
      }
    });
};

//export controller functions
module.exports = {
  getAll,
  uploadImg,
  newItem,
  deleteAll,
  getOne,
  updateOne,
  addACommentOnItem,
  deleteOne
};
