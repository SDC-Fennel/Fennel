require('dotenv').config();
const express = require('express');
const axios = require('axios');
const db = require('../database/api');

const app = express();
const port = 4000;

app.get('/reviews', (req, res) => {
  const { product_id } = req.query;
  const count = req.query.count || 5;
  const page = req.query.page || 1;

  db.getReviews(product_id, page, count)
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
});

app.post('/reviews', (req, res) => {
  const inputs = req.query;
  inputs.date = Number(new Date());
  inputs.recommend = false;
  inputs.reported = false;
  inputs.helpful = 0;

  db.addReview(inputs)
    .then(() => {
      res.status(200);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
