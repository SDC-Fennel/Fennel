const router = require('express').Router();
const controllers = require('./controllers');

router.get('/reviews', controllers.reviews.get);
// add photos to the get retrieval
router.post('/reviews', controllers.reviews.post);
// get /reviews/meta
router.put('/reviews/:review_id/helpful', controllers.reviews.put);
router.put('/reviews/:review_id/report', controllers.reviews.put);

module.exports = router;
