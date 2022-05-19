const async = require('async');
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

//PATCH '/district/:code'
const updateOne = (req, res) => {
  District.findOneAndUpdate({code: req.params.code}, {$set: req.body}, {new: true})
    .then(doc => res.json(doc))
    .catch(err => res.send(err));
};

//PATCH '/district'
const updateAll = (req, res) => {
  const inputValues = req.body;
  District.find({})
    .then(data => {
      const output = [];

      data.forEach(district => {
        const inputEl = inputValues.find(inputElement => inputElement.code === district.code);
        if (inputEl) {
          output.push({
            code: inputEl.code,
            prices: {...district.prices, ...inputEl.prices}
          });
        }
      });

      async.eachSeries(output, (obj, next) => {
        District.findOneAndUpdate({ code: obj.code }, { $set : { prices: obj.prices }}, next);
      }, err => {
        if (err) console.error(err)
        else res.sendStatus(200);
      });
    })
    .catch(err => res.send(err));
};

//export controller functions
module.exports = {
  getAll,
  getOne,
  updateOne,
  updateAll
};
