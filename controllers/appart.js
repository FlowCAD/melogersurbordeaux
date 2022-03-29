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
    link: req.body.link,
    state: req.body.state,
    price: req.body.price,
    priceBySurface: req.body.priceBySurface,
    agencyPrice: req.body.agencyPrice,
    notaryFees: req.body.notaryFees,
    district: req.body.district,
    address: req.body.address,
    lon: req.body.lon,
    lat: req.body.lat,
    surface: req.body.surface,
    surfaceCarrez: req.body.surfaceCarrez,
    exterior: req.body.exterior,
    surfaceExterior: req.body.surfaceExterior,
    exposition: req.body.exposition,
    visAVis: req.body.visAVis,
    floor: req.body.floor,
    floors: req.body.floors,
    dpe: req.body.dpe,
    ges: req.body.ges,
    parking: req.body.parking,
    bikeParking: req.body.bikeParking,
    annualCondominiumFees: req.body.annualCondominiumFees,
    numberOfLots: req.body.numberOfLots,
    description: req.body.description,
    image: req.file ? req.file.path : '',
    createdBy: req.body.createdBy,
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
  Appart.findOneAndUpdate({code: req.params.code}, {$set: req.body}, {new: true})
    .then(doc => res.json(doc))
    .catch(err => res.send(err));
};

//POST '/appart/:code'
const addACommentOnItem = (req, res) => {
  const comment = {
    text: req.body.text,
    author: req.body.author || 'admin',
    date: new Date()
  };

  Appart.findOne({code: req.params.code})
    .then(data => {
      if (data) {
        if (comment.text) {
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
