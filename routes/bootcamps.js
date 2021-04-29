const express = require('express');
const {
  getBootcamps,
  getBootcamp,
  postBootcamp,
  putBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUploadBootcamp,
} = require('../controllers/bootcamps');

const Bootcamp = require('../models/Bootcamp');
const advancedResults = require('../middleware/advancedResults');

// Include other resource routers
const courseRouter = require('./courses');

const router = express.Router();

// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);
router.route('/:id/photo').put(bootcampPhotoUploadBootcamp);

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(postBootcamp);
router.route('/:id').get(getBootcamp).put(putBootcamp).delete(deleteBootcamp);

module.exports = router;
