import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import investorRoute from './routes/investorRoute.js';
// import stripeRoute from './routes/stripeRoute.js'
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import { fileURLToPath } from 'url';
import Stripe from 'stripe';
import path from 'path';
import bodyParser from 'body-parser';

dotenv.config();
connectDB();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const PORT = process.env.PORT;
const app = express();

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'GoodPlace-CRM Admin API',
        version: '1.0.0',
        description: 'API documentation for my app',
    },
    servers: [
        {
            url: process.env.BASE_URL || `http://localhost:${PORT}`,
            description: 'API Base URL',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js', './routes/*.mjs'], // path to the API route files
};

// Create swagger spec
const swaggerSpec = swaggerJsdoc(options);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/swagger-static', express.static(path.join(__dirname, 'node_modules', 'swagger-ui-dist')));
app.use(
    '/docs',
    swaggerUi.serveFiles(null, { swaggerOptions: { url: '/swagger-static/swagger.json' } }),
    swaggerUi.setup(null, { swaggerOptions: { url: '/swagger-static/swagger.json' } })
);

// Serve Swagger JSON
app.get('/swagger-static/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});


// Serve swagger docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/investor', investorRoute);


// Use raw body parser for webhook validation
app.post('/api/stripe/webhook', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    // Verify Stripe signature
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers['stripe-signature'],
      endpointSecret
    );
  } catch (err) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      break;

    case 'invoice.payment_failed':
      const invoice = event.data.object;
      console.log(`Invoice payment failed for customer ${invoice.customer}`);
      break;

    // Add more cases for other event types you want to handle
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Respond to Stripe to acknowledge receipt of the event
  res.json({ received: true });
});


app.listen(PORT || 8080, () => {
    console.log(`Server running on ${PORT}`);
    console.log(`Swagger docs available at ${PORT}/docs`);
});
