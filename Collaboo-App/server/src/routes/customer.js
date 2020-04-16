const express = require('express');
const route = new express.Router();
const Customer= require("../models/customer");


route.post("/customers", async (req, res) => {
    const customer = new Customer(req.body);
  
    try {
      await customer.save();
      res.status(201).send(craftsmen);
    } catch (e) {
      res.status(400).send(e); 
    }
  });

  route.get("/customers", async (req, res) => {

  
    try {
      const craftsmen = await(Customer.find({}))
      res.status(200).send(craftsmen);
    } catch (e) {
      res.status(500).send(e); 
    }
  });

  module.exports = route;