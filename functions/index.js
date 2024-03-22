const functions = require("firebase-functions");
const { onRequest } = functions;
const { stripe } = require('./stripe'); // Import stripe từ module stripe.js

exports.helloWorld = onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    response.send("Hello from Firebase!");
});

exports.CheckoutSession = onRequest(async (request, response) => {
    try {
        const session = await stripe.checkout.sessions.create({
            success_url: 'https://example.com/success',
            cancel_url: 'https://example.com/cancel',
            payment_method_types: ['card'],
            line_items: [
                {
                    name: 'T-shirt',
                    description: 'Comfortable cotton',
                    images: ['https://i.stack.imgur.com/xHkRf.jpg'],
                    amount: 1500,
                    currency: 'usd',
                    quantity: request.query.quantity || 1,
                }
            ],
            mode: 'payment',
        });
        response.send(session);
    } catch (error) {
        functions.logger.error("Error creating checkout session:", error);
        response.status(500).send({ error: "Error creating checkout session" });
    }
});
