import validUrl from 'valid-url';

const validateUrl = (req, res, next) => {
    const { originalUrl } = req.body;

    if(!originalUrl){
        return res.status(400).json({error: 'Original url required!'})
    }

    if (!validUrl.isUri(originalUrl)) {
        return res.status(400).json({ error: 'Invalid url. Try again'});
    }
    next();
}

export default validateUrl;
 