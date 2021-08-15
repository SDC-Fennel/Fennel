const models = require('../models');

module.exports = {
  get: (req, res) => {
    const { product_id } = req.query;
    const count = req.query.count || 5;
    const page = req.query.page || 1;
    const sort = req.query.sort || 'newest';

    const url = req.url.split('/');
    const route = url[url.length - 1];

    if (route.includes('meta')) {
      // const output = models.reviews.getMeta(product_id);
      // res.status(200).send(output);
      models.reviews.getMeta(product_id)
        .then((results) => {
          results.forEach((result) => console.log(result.rows));
          res.status(200).send('success');
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send(error);
        });
    } else {
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
          res.status(500).send(error);
        });
    }
  },
  post: (req, res) => {
    const inputs = req.query;
    inputs.date = Number(new Date());

    const testInput = {
      product_id: 4,
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
      photos: ['url1', 'url2', 'url3'],
      characteristics: {
        "10": 5,
        "11": 4,
      },
    };

    // if a photos key exists in the request, send a query to the reviews_photos api

    models.reviews.addReview(testInput)
      .then(() => {
        res.status(201).send('success');
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },
  put: (req, res) => {
    const url = req.url.split('/');
    const route = url[url.length - 1];
    const id = req.params.review_id;

    if (route === 'helpful') {
      models.reviews.updateHelpful(id)
        .then(() => {
          res.status(204).send();
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    } else if (route === 'report') {
      models.reviews.updateReported(id)
        .then(() => {
          res.status(204).send();
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }
  },
};
