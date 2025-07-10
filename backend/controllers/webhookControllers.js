const crypto = require('crypto');
const asyncHandler = require('express-async-handler');

const handleWebhook = asyncHandler(async (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const signature = req.headers['x-razorpay-signature'];

    const payload = req.rawBody.toString();

    const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');

    if (signature === expectedSignature) {
        console.log('Payment verified:', req.body.payload.payment.entity);



        res.status(200).json({ status: 'ok' });
    } else {
        console.warn('Invalid webhook signature');
        res.status(400).json({ error: 'Invalid signature' });
    }
});

module.exports = { handleWebhook };
