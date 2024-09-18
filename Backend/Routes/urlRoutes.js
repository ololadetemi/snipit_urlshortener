import  express from 'express';
import { shortenUrl, redirectToOriginalUrl, getAnalytics } from '../controllers/shortnController.js';
import validateUrls from '../Middlewares/validateUrls.js';

const router = express.Router();


//Route to shorten URL
router.post('/shorten', validateUrls, shortenUrl);
//To redirect to original url
router.get('/:shortUrl', redirectToOriginalUrl);
//To get analytics for shortened URL
router.get('/analytics/:shortUrl', getAnalytics);

export default router;
