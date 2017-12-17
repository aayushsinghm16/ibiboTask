'use strict';
var async = require('async');
module.exports = function(Books) {
  Books.bookDetail = function(bookId, cb) {
    // return book document according to bookId and if not found it will return message
    Books.findById(bookId, {include: ['author']}, function(err, instance) {
      if(err) console.log(err);
      if(!instance){
        cb(null, {message:'no data for this id'});
      }
      let response = instance;
      console.log(instance);
      cb(null, response);
    });
  },
  Books.remoteMethod('bookDetail', {
      // api path /api/books/:id/bookDetail
      http: {path: '/:id/bookDetail', verb: 'get',errorStatus:'400'},
      accepts: {arg: 'id', type: 'string', required: true},
      returns: {type: 'object', root: true}
    });
    Books.observe('after save', function(ctx, next) {
    if (ctx.instance) {
      async.parallel([
          function(callback) {
            Books.count( {authorId: ctx.instance.authorId},function (err,count) {
              callback(null,count)
            });
          },
          function(callback) {
            Books.app.models.author.findById(ctx.instance.authorId,function(err, data) {
              if(data){
                callback(null, data)
              }
            })
          }
      ],
      // optional callback
      function(err, results) {
          results[1].numberOfBooks=results[0]
          let data;
          data=results[1];
          data.updateAttributes(data,function (err, res) {
            //console.log(res);
            if(err) console.log(err);
          })
      });
      Books.count( {authorId: ctx.instance.authorId},function (err,count) {

      });
    } else {
      console.log('Updated %s matching %j',
        ctx.Model.pluralModelName,
        ctx.where);
    }
    next();
  });
};
