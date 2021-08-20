const models = require('../models');

module.exports = {
  get: (req, res) => {
    const { product_id } = req.query;
    const count = req.query.count || 5;
    const page = req.query.page || 1;
    const sort = req.query.sort || 'newest';

    if (req.url.includes('meta')) {
      const output = {
        product_id,
        ratings: {},
        recommend: {},
        characteristics: {},
      };

      models.reviews.getMeta(product_id)
        .then((results) => {
          results.forEach((result) => {
            result.rows.forEach((row) => {
              let item;
              if (row.ratings) {
                item = 'ratings';
              }
              if (row.recommend) {
                item = 'recommend';
                if (row[item].false) {
                  row[item]['0'] = row[item].false;
                  delete row[item].false;
                } else {
                  row[item]['1'] = row[item].true;
                  delete row[item].true;
                }
              }
              if (row.characteristics) {
                item = 'characteristics';
              }

              Object.keys(row[item]).forEach((key) => {
                output[item][key] = row[item][key];
              });
            });
          });
          res.status(200).send(output);
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    } else {
      models.reviews.getReviews(product_id, page, count, sort)
        .then((results) => {
          results.rows.forEach((review) => {
            review.date = new Date(Number(review.date));
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
    req.query.date = Number(new Date());

    models.reviews.addReview(req.query)
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
          res.status(204).status;
        })
        .catch((error) => {
          res.status(500).send(error);
        });
    }
  },
};
