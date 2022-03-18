const jwt = require('jsonwebtoken');
const { User } = require('../models');

// POST '/register'
const register = (req, res) => {
  const newUser = new User({
    name: req.body.name,
    password: req.body.password
  });

  newUser.save()
    .then(data => {
      let payload = { subject: data._id };
      let token = jwt.sign(payload, process.env.SECRET_KEY);
      res.json({token});
    })
    .catch(err => {
      console.error(err);
      res.json({Error: err});
    }
  );
};

// POST '/login'
const login = (req, res) => {
  let userData = req.body;

  User.findOne({name: userData.name})
    .then(user => {
      if (!user || user.password !== userData.password) {
        res.sendStatus(401);
      } else {
        let payload = { subject: user._id };
        let token = jwt.sign(payload, process.env.SECRET_KEY);
        res.json({token});
      }
    })
    .catch(err => {
      console.error(err);
      res.json({Error: err});
    });
};


//export controller functions
module.exports = {
  register,
  login
};
