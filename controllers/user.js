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

//export controller functions
module.exports = { register };
