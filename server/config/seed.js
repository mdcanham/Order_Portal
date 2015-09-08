/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Product = require('../api/product/product.model');
var User = require('../api/user/user.model');

Product.find({}).remove(function() {
  Product.create({
    name: 'Garden hose 5m',
    info: 'A 5 metre long garden hose. Perfect for a small home.',
    category: 'Home and Garden',
    price: 53,
    active: true
  }, {
    name: 'Apple iPhone 6 Plus',
    info: 'The next generation in smartphone technology.',
    category: 'Technology',
    price: 1125,
    active: true
  }, {
    name : 'Apple iPhone 3G',
    info: 'The original iPhone wiht 3G technology.',
    category: 'Technology',
    price: 850.25,
    active: false
    },  {
    name : 'Pot Plant',
    info : 'A small pot plant, perfect for an indoor setting.',
    category: 'Home and Garden',
    price: 15.50,
    active: true
  },  {
    name : 'T-Shirt',
    info : 'A plain white tshirt, something casual for the weekends.',
    category: 'Clothing',
    price: 23,
    active: true
  },
  {
    name : 'Nike Free Run',
    info : 'The next generation in footware technology.',
    category : 'Footware',
    price : 120.25,
    active : true
  },
  {
    name : 'Business Socks',
    info : 'A pair of plain black business socks. An essential part of every formal outfit.',
    category: 'Clothing',
    price: 10,
    active: true
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});
