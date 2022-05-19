const { District } = require('../models');


//GET '/district'
const getAll = (req, res) => {
  District.find({})
    .then(data => res.json(data))
    .catch(err => {
      console.error(err);
      res.json({Error: err});
    }
  );
};

//GET '/district/:code'
const getOne = (req, res) => {
  District.findOne({code: req.params.code})
    .then(data => {
      if (data) res.json(data);
      else res.sendStatus(404);
    })
    .catch(err => {
      console.error(err);
      res.json({Error: err});
    }
  );
};

//export controller functions
module.exports = {
  getAll,
  getOne
};
