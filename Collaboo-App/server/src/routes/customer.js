const express = require('express');
const route = new express.Router();
const Customer= require("../models/customer");

route.post("/customers", async (req, res) => {
    const customer = new Customer(req.body);
  
    try {
      await customer.save();
      res.status(201).send(customer);
    } catch (e) {
      res.status(400).send(e);
    }
  });
  module.exports = route;