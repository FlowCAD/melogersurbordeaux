const { User } = require('../models');

// POST '/register'
const register = (req, res) => {
  const newUser = new User({
    name: req.body.name,
    password: req.body.password
  });

  newUser.save()
    .then(data => res.json(data))
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
        res.json(user);
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
