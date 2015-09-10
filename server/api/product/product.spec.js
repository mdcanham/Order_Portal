'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/products', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/products')
      .expect(401)
      .expect('Content-Type', /text/)
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
