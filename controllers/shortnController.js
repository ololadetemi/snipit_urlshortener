const { nanoid } = require('nanoid');
const shortnUrl = require('../models/shortnController');
const generateQRCode = ('../utility/qrCodeGenerator');

const BASE_URL = process.env.BASE_URL

exports.shortenUrl = async (req, res) => {
    const { originalUrl }  = req.body;
    try {
        let url = await shortnUrl.findOne({ originalUrl });
        if (url) {
            return res.status(200).json({
                shortUrl: `${BASE_URL}/${url.shortUrl}`,
                qrCode: url.qrcode,
                clicks: url.clicks
            });
        }

        const shortUrlCode = nanoid(6);
        const qrCode = await generateQRCode(`${BASE_URL}/${shortUrlCode}`);

        url = new shortnUrl({
            originalUrl,
            shortUrl:shortUrlCode,
            qrcode: qrCode
        });

        await url.save();

        res.status(201).json({
            shortUrl: `${BASE_URL}/${shortUrlCode}`,
            qrCode,
            clicks: url.clicks
        });

    } catch (error) {
        console.error('Error shortening URL', error);
        res.status(500).json({error: 'Error please try again later'});
    }
};

exports.redirectToOriginalUrl = async (req, res) => {
    const { shortUrl } = req.params;

    try{
        const url = await shortn.findOne({ shortUrl });
        if (url) {
            url.clicks += 1;
            await url.save();
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).json({ error: "No URL found"});
        }

    }catch (error) {
        console.error('Error while reidrecting to original URL:', error);
        res.status(500).json({ error: 'Server error. Please try again later'});

    }
};

exports.getAnalytics = async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const url = await shortnUrl.findOne({ shortUrl });
        if (url) {
            return res.status(200).json({
                originalUrl: url.originalUrl,
                shortUrl: `${BASE_URL}/${url.shortUrl}`,
                clicks: url.clicks,
                qrcode: url.qrcode
            });
        } else {
            return res.status(404).json({ error: 'No URL found' });
        }
    } catch (error) {
        console.error('Error fetching analytics:', error);
        res.status(500).json({ error: 'Server error. Please try again later' });
    }
};