import stripe from 'stripe';
import Booking from '../models/Booking.js';
export const stripeWebhooks = async(request, response) => {
    const strioeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const sig = request.headers['stripe-signature'];
    let event;
    try {
        event = strioeInstance.webhooks.constructEvent(request.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
        
    } catch (error) {
        return response.status(400).send(`Webhook Error: ${error.message}`);
    }

    try {
        switch (event.type) {
            case 'payment_intent.succeeded':{
                const paymentIntent = event.data.object;
                const sessionList = await strioeInstance.checkout.sessions.list({
                    payment_intent: paymentIntent.id,
                }, )
                const session = sessionList.data[0];
                const {bookingId} = session.metadata;
                await Booking.findByIdAndUpdate(bookingId, {isPaid: true,paymentLink:""});
                // Then define and call a function to handle the event payment_intent.succeeded
                break
            }
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
        response.json({received: true});
    } catch (error) {
        console.log("webhook handler failed", error);
        response.status(400).send('Webhook handler failed');    
    }
}