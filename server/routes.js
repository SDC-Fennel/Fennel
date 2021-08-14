const router = require('express').Router();
const controllers = require('./controllers');

router.get('/reviews', controllers.reviews.get);
router.get('/reviews/meta', controllers.reviews.get);
router.post('/reviews', controllers.reviews.post);
router.put('/reviews/:review_id/helpful', controllers.reviews.put);
router.put('/reviews/:review_id/report', controllers.reviews.put);

module.exports = router;
