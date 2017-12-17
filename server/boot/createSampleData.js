// 'use strict';
// var async = require('async');
// module.exports = function(app) {
//   //  data sources
//   var mongoDs = app.dataSources.library;
//   //  create all models
//
//   async.parallel({
//     authors: async.apply(createAuthor),
//   }, function(err, results) {
//     if (err) throw err;
//     createBooks(results.authors, function(err) {
//       console.log('> models created sucessfully');
//     });
//   });
//   //  create Author
//   function createAuthor(cb) {
//     mongoDs.autoupdate('author', function(err) {
//       if (err) return cb(err);
//       var Author = app.models.author;
//       Author.create([{
//         'authorName': 'Aayush',
//         'age': 22,
//       }, {
//         'authorName': 'Mrinal',
//         'age': 22,
//       }, {
//         'authorName': 'Mayank',
//         'age': 22,
//       }], cb);
//     });
//   }
//   // create books
//   function createBooks(authors, cb) {
//     mongoDs.automigrate('books', function(err) {
//       if (err) return cb(err);
//       var Books = app.models.books;
//       Books.create([{
//         date: Date.now(),
//         price: 5,
//         name: 'zxc',
//         authorId: authors[0].id,
//       }, {
//         date: Date.now(),
//         price: 5,
//         name: 'asd',
//         authorId: authors[1].id,
//       }, {
//         date: Date.now(),
//         price: 5,
//         name: 'qwe',
//         authorId: authors[1].id,
//       }, {
//         date: Date.now(),
//         price: 5,
//         name: 'fgh',
//         authorId: authors[2].id,
//       }], cb);
//     });
//   }
// };
