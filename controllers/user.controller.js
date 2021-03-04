const User = require('../models/user')

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  const user = new User({
    ssn: req.body.ssn,
    fName: req.body.fName,
    lName: req.body.lName,
    age: req.body.age,
    address: req.body.address,
    phone: req.body.phone,
  });

  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || "An error occurred while creating the User."
      });
    });
};

exports.findAll = (req, res) => {
  User.find()
    .then(data => {
      res.send(data);
    })
    .catch(e => {
      res.status(500).send({
        message: e.message || "Something went wrong while getting all users."
      });
    });
};

exports.findOne = (req, res) => {
  const ssn = req.params.ssn;

  User.findById(ssn)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Did not find a User with ssn: " + ssn });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "An error occurred while retrieving User with ssn:" + ssn });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Updated User data can not be empty!"
    });
  }

  const ssn = req.params.ssn;

  Tutorial.findByIdAndUpdate(ssn, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with ssn:${ssn}. Maybe the User was not found!`
        });
      } else res.send({ message: "User's data was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating data for User with ssn=" + ssn
      });
    });
};