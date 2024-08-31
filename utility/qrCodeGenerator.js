const QRCode = require('qrcode');

const generateQRCode = async(url) => {
    try {
        const qrCodeData = await QRCode.toDataURL(url);
        return qrCodeData;
    } catch (error) {
        console.error('Error generating qr code:', error);
        throw new Error('could not generate qr code');
    }
}

module.exports = generateQRCode;