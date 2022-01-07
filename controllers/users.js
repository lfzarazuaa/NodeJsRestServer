const { response, request } = require("express");

const usersGet = (req = request, res = response) => {
  const { name, id = 0, apiKey } = req.query; // Destructure the object.
  res.json({
    msg: "get API - controller",
    name,
    id,
    apiKey
  });
};

const usersPost = (req = request, res = response) => {
  const body = req.body;
  const name = req.body.name;
  const age = req.body.age;
  res.json({
    msg: "post API",
    body,
    name,
    age,
  });
};

const usersPut = (req, res = response) => {
  res.json({
    msg: "put API",
  });
};

const usersPatch = (req, res = response) => {
  res.status(400).json({
    msg: "patch API",
  });
};

const usersDelete = (req, res = response) => {
  res.json({
    msg: "delete API",
  });
};

module.exports = { usersGet, usersPost, usersPut, usersPatch, usersDelete };
