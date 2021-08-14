const models = require('../models');

module.exports = {
  get: (req, res) => {
    const { product_id } = req.query;
    const count = req.query.count || 100;
    const page = req.query.page || 1;
    const sort = req.query.sort || 'newest';

    models.reviews.getReviews(product_id, page, count, sort)
      .then((results) => {
        results.rows.forEach((review) => {
          const date = new Date(Number(review.date));
          review.date = date;
        });
        const output = {
          product_id,
          count,
          page,
          results: results.rows,
        };
        res.status(200).send(output);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });
  },
  post: (req, res) => {
    const inputs = req.query;
    inputs.date = Number(new Date());
    inputs.recommend = false;
    inputs.reported = false;
    inputs.helpful = 0;

    const testInput = {
      product_id: 25167,
      rating: 5,
      date: Number(new Date()),
      summary: 'THIS IS A TEST',
      body: 'BIG TEST',
      recommend: false,
      reported: false,
      reviewer_name: 'TEST',
      reviewer_email: 'TEST',
      response: null,
      helpful: 100000,
    };

    // if a photos key exists in the request, send a query to the reviews_photos api

    models.reviews.addReview(testInput)
      .then(() => {
        res.status(201);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },
  put: (req, res) => {
    console.log(req);
    const url = req.url.split('/');
    const route = url[url.length - 1];
    const id = req.params.review_id;

    console.log(route, id);

    if (route === 'helpful') {
      models.reviews.updateHelpful(id)
        .then(() => {
          res.status(204).send();
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send(error);
        });
    } else if (route === 'report') {
      models.reviews.updateReported(id)
        .then(() => {
          res.status(204).send();
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send(error);
        });
    }
  },
  // putReport: (req, res) => {
  //   models.review.updateReport(req.params.review_id);
  // },
};
