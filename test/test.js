'use strict';
var assert = require('chai').assert,
  app = require('../server/server'),
  superagent = require('superagent');
var nock = require('nock');
describe('author and books', function() {
  // booksDetail test case with correct book id
  it('should return status 200 on bookDetail get request', function(done) {
    // mocking api using nock, this mock api will response with data for book id 1
    nock("http://localhost:3000/")
    .get('/api/books/1/bookDetail')
    .reply(200,{
      'status':200,
      'id': 1,
      'name': 'myBook',
      'price': 200,
      'date': "2017-12-17T13:38:31.027Z",
      'author':{
        'id': 1,
        'authorName': 'aayush',
        'age': '27'
      }
    });

    superagent
    .get('http://localhost:3000/api/books/1/bookDetail')
    .then(function(res) {
      assert.equal(res.status, 200);
      assert.typeOf(res.body, 'object');
      assert.equal(res.body.author.id,1);
      done();
    })
    .catch(function(err) {
      console.log('bookdetail call error'+err);
    });
  });

  // test case for wrong book id
  it('should return status 200 on bookDetail get request and "no data for this id" for wrong id', function(done) {
    // mocking api using nock, this mock api will response with message for wrong book id
    nock("http://localhost:3000/")
    .get('/api/books/wrongdata/bookDetail')
    .reply(200,{message:'no data for this id'});
    superagent
    .get('http://localhost:3000/api/books/wrongdata/bookDetail')
    .then(function(res) {
      assert.equal(res.status, 200);
      assert.typeOf(res.body, 'object');
      assert.equal(res.body.message,'no data for this id');
      done();
    })
    .catch(function(err) {
      console.log('bookdetail call error'+err);
    });
  });

});
