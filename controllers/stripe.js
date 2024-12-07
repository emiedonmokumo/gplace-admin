import Stripe from 'stripe';
import dotenv from 'dotenv'
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getStripeEvents = async (req, res) => {
  try {
    // List the events
    const events = await stripe.events.list({
      limit: 10, // Number of events to retrieve
    });

    // Loop through the events and log them
    // events.data.forEach((event) => {
    //   console.log(`Event ID: ${event.id}`);
    //   console.log(`Event Type: ${event.type}`);
    //   console.log(`Event Data:`, event.data.object);
    // });

    res.status(200).json(events.data)
  } catch (error) {
    res.status(500).json({ message: error })
  }
}
