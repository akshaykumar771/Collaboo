const express = require('express');
const route = new express.Router();
const Craftsmen= require("../models/cratfsmen");

route.post("/craftsmen", async (req, res) => {
    const craftsmen = new Craftsmen(req.body);
  
    try {
      await craftsmen.save();
      res.status(201).send(craftsmen);
    } catch (e) {
      res.status(400).send(e);
    }
  });

  route.get("/craftsmen", async (req, res) => {

  
    try {
      const craftsmen = await(Craftsmen.find({}))
      res.status(200).send(craftsmen);
    } catch (e) {
      res.status(500).send(e); 
    }
  });
  module.exports = route;