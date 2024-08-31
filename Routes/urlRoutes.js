const express = require('express');
const router = express.Router();
const shortnController = require('../controllers/shortnController');
const validateUrls = require('../Middlewares/validateUrls');


//Route to shorten URL
router.post('/shorten', shortnController.shortenUrl);
//To redirect to original url
router.get(':/shortUrl', shortnController.redirectToOriginalUrl);
//To get analytics for shortened URL
router.get('/analytics/:shortUrl', shortnController.getAnalytics);

module.exports = router;
