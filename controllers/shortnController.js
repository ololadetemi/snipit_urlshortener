import { nanoid } from 'nanoid';
import shortnUrl from '../models/shortn.js';
import generateQRCode from '../utility/qrCodeGenerator.js';

const BASE_URL = "http://snipit";

export const shortenUrl = async (req, res) => {
    const { originalUrl, customSlug } = req.body;
    try {
        // Check if the original URL already exists in the database
        let url = await shortnUrl.findOne({ originalUrl });
        if (url) {
            return res.status(200).json({
                shortUrl: `${BASE_URL}/${url.shortUrl}`,
                qrCode: url.qrCode,
                clicks: url.clicks
            });
        }

        // Generate short URL code, either using the custom slug or nanoid
        const shortUrlCode = customSlug ? customSlug : nanoid(8);

        // Check if the custom slug already exists in the database
        if (customSlug) {
            const existingSlug = await shortnUrl.findOne({ customSlug: shortUrlCode });
            if (existingSlug) {
                return res.status(400).json({ error: 'Custom slug already exists, please choose another one.' });
            }
        }

        // Generate the QR code
        const qrCode = await generateQRCode(`${BASE_URL}/${shortUrlCode}`);
        console.log('QR Code:', qrCode);

        // Create a new short URL document
        const urlData = {
            originalUrl,
            shortUrl: shortUrlCode,
            qrCode: qrCode,
        };

        // Only include customSlug if it exists
        if (customSlug) {
            urlData.customSlug = customSlug;
        }

        url = new shortnUrl(urlData);
        await url.save();

        res.status(201).json({
            shortUrl: `${BASE_URL}/${shortUrlCode}`,
            qrCode,
            clicks: url.clicks
        });

    } catch (error) {
        console.error('Error shortening URL', error);
        res.status(500).json({ error: 'Error please try again later' });
    }
};

export const redirectToOriginalUrl = async (req, res) => {
    const { shortUrl } = req.params;

    try {
        const url = await shortnUrl.findOne({ shortUrl });
        if (url) {
            url.clicks += 1;
            await url.save();
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).json({ error: "No URL found" });
        }

    } catch (error) {
        console.error('Error while redirecting to original URL:', error);
        res.status(500).json({ error: 'Server error. Please try again later' });
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
