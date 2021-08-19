const path = require('path');
const router = require('express').Router();
const controllers = require('./controllers');

router.get('/reviews', controllers.reviews.get);
router.get('/reviews/meta', controllers.reviews.get);
router.post('/reviews', controllers.reviews.post);
router.put('/reviews/:review_id/helpful', controllers.reviews.put);
router.put('/reviews/:review_id/report', controllers.reviews.put);

router.get('/loaderio-12f6526405c98439094afaa7a48aa8bc.txt', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../loaderio-12f6526405c98439094afaa7a48aa8bc.txt'));
});

module.exports = router;
