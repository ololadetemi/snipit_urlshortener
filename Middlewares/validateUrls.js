const validUrl = require('valid-url');

const validateUrl = (req, res, next) => {
    const { originalUrl } = req.body;

    if(!originalUrl){
        return res.status(400).json({error: 'Original url required!'})
    }

    if (!ValidUrl.isUri(url)) {
        return res.status(400).json({ error: 'Invalid url. Try again'});
    }
    next();
}

module.exports = validateUrl;
 