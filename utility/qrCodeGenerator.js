import  QRCode from 'qrcode';

const generateQRCode = async (url) => {
    try {
        const qrCodeData = await QRCode.toDataURL(url);
        console.log('QR Code generated:', qrCodeData)
        return qrCodeData;
    } catch (error) {
        console.error('Error generating qr code:', error);
        throw new Error('could not generate qr code');
    }
}

export default generateQRCode;