import { nanoid } from 'nanoid';
import shortnUrl from '../models/shortn.js';
import generateQRCode from  '../utility/qrCodeGenerator.js';

const BASE_URL = process.env.BASE_URL

export const shortenUrl = async (req, res) => {
    const { originalUrl, customSlug }  = req.body;
    try {
        let url = await shortnUrl.findOne({ originalUrl });
        if (url) {
            return res.status(200).json({
                shortUrl: `${BASE_URL}/${url.shortUrl}`,
                qrCode: url.qrCode,
                clicks: url.clicks
            });
        }

        const shortUrlCode = customSlug ? customSlug : nanoid(6);
        const existingSlug = await shortnUrl.findOne({ customSlug: shortUrlCode });
        if (existingSlug) {
            return res.status(400).json({ error: 'Custom slug already exists, please choose another one.' });
        }
        const qrCode = await generateQRCode(`${BASE_URL}/${shortUrlCode}`);
        console.log('QR Code:', qrCode)

        url = new shortnUrl({
            originalUrl,
            shortUrl:shortUrlCode,
            qrCode: qrCode
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

export const redirectToOriginalUrl = async (req, res) => {
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

export const getAnalytics = async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const url = await shortnUrl.findOne({ shortUrl });
        if (url) {
            return res.status(200).json({
                originalUrl: url.originalUrl,
                shortUrl: `${BASE_URL}/${url.shortUrl}`,
                clicks: url.clicks,
                qrcode: url.qrCode
            });
        } else {
            return res.status(404).json({ error: 'No URL found' });
        }
    } catch (error) {
        console.error('Error fetching analytics:', error);
        res.status(500).json({ error: 'Server error. Please try again later' });
    }
};