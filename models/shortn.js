const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const shortnUrlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true,
        default: () => nanoid(6)
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    qrCode: {
        type: String,
        required: true
    },
    customSlug: {
        type: String,
        required: false,
        unique: true
    },
}, { timestamps: true});

module.exports = mongoose.model('shortnUrl', shortnUrlSchema);