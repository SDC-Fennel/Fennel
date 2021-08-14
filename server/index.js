// require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const router = require('./routes');

const app = express();
module.exports.app = app;

app.set('port', 4000);

app.use(morgan('dev'));
app.use(express.json());

app.use('/', router);

if (!module.parent) {
  app.listen(app.get('port'));
  console.log(`Listening on http://localhost:${app.get('port')}`);
}

// // app.get('/reviews/meta', (req, res) => {
// //   const { product_id } = req.query;
// //   const count = req.query.count || 100;
// //   const page = req.query.page || 1;

// //   db.getReviews(product_id, page, count)
// //     .then((results) => {
// //       let metaData = {
// //         product_id: product_id,
// //         ratings: {
// //           1: 0,
// //           2: 0,
// //           3: 0,
// //           4: 0,
// //           5: 0,
// //         },
// //         recommended: {

// //         }
// //       };
// //       results.rows.forEach((review) => {

// //       });

// //       const output = {
// //         product_id,
// //         count,
// //         page,
// //         results: results.rows,
// //       };
// //       res.status(200).send(output);
// //     })
// //     .catch((error) => {
// //       res.status(500).send(error);
// //     });
// // });

app.put('/reviews/:review_id/helpful', (req, res) => {
  db.updateHelpful(req.query.review_id)
    .then((results) => {
      console.log('helpful should be updated bruh');
      res.status(200).send(results);
    })
    .catch((error) => {
      console.log('Error updating helpful: ', error);
      res.status(500).send(error);
    });
});
