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


//export controller functions
module.exports = {
  getAll
};
