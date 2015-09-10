'use strict';

var _ = require('lodash');
var Product = require('./product.model');

// Get list of products
exports.index = function(req, res) {
  Product.find(function (err, products) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(products);
  });
};

// Get a single product
exports.show = function(req, res) {
  Product.findById(req.params.id, function (err, product) {
    if(err) { return handleError(res, err); }
    if(!product) { return res.status(404).send('Not Found'); }
    return res.json(product);
  });
};

// Creates a new product in the DB.
exports.create = function(req, res) {
  Product.create(req.body, function(err, product) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(product);
  });
};

// Updates an existing product in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Product.findById(req.params.id, function (err, product) {
    if (err) { return handleError(res, err); }
    if(!product) { return res.status(404).send('Not Found'); }
    var updated = _.merge(product, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(product);
    });
  });
};

// Deletes a product from the DB.
exports.destroy = function(req, res) {
  Product.findById(req.params.id, function (err, product) {
    if(err) { return handleError(res, err); }
    if(!product) { return res.status(404).send('Not Found'); }
    product.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

// Get a list of all availabe categories
exports.getCategories = function(req, res) {
  Product.distinct('category', function (err, categories) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(categories);
  });
};

//Place an order
exports.order = function(req, res) {
  var nodemailer = require('nodemailer');
  var user = req.body[0];

  var orderString = 'Hi ' + user.name + ',\n\nYou have ordered the following products:\n\n';

  for(var i = 1; i < req.body.length; i++){
    var currentProduct = req.body[i];
    if(currentProduct.quantity > 0){
      orderString += req.body[i].quantity + ' x ' + req.body[i].name + '\n';
    }
  }

  orderString += '\nThank you for placing an order with us, we\'ll be in touch soon with an invoice and estimated delivery dates.'

  var transporter = nodemailer.createTransport({
      service: 'Zoho',
      auth: {
          user: process.env.ZOHO_EMAIL,
          pass: process.env.ZOHO_PASSWORD
      }
  });
  transporter.sendMail({
      from: process.env.ZOHO_EMAIL,
      to: user.email,
      subject: 'hello',
      text: orderString
  }, function(error, info){
    if(error) {
      res.send(500);
    } else {
      res.send(200);
    }
  });
};


function handleError(res, err) {
  return res.status(500).send(err);
}
