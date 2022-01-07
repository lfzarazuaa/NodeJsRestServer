const { response, request } = require("express");

const usersGet = (req, res = response) => {
    res.json({
        msg: 'get API - controller'
    });
}

const usersPost = (req = request, res = response) => {
    const body = req.body;
    const name =  req.body.name
    const age =  req.body.age
    res.json({
      msg: "post API",
      body,
      name,
      age
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

module.exports = {usersGet, usersPost, usersPut, usersPatch, usersDelete}