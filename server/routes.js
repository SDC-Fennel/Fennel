const path = require('path');
const router = require('express').Router();
const controllers = require('./controllers');

router.get('/reviews', controllers.reviews.get);
router.get('/reviews/meta', controllers.reviews.get);
router.post('/reviews', controllers.reviews.post);
router.put('/reviews/:review_id/helpful', controllers.reviews.put);
router.put('/reviews/:review_id/report', controllers.reviews.put);

router.get('/loaderio-f130cc16fb5189d0794586b567c1aa9c.txt', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../loaderio-f130cc16fb5189d0794586b567c1aa9c.txt'));
});

module.exports = router;
