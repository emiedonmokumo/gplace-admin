import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import investorRoute from './routes/investorRoute.js';
import stripeRoute from './routes/stripeRoute.js'
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import { fileURLToPath } from 'url';

import path from 'path';



dotenv.config();
connectDB();

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
app.use('/api/stripe', stripeRoute)

app.listen(PORT || 8080, () => {
    console.log(`Server running on ${PORT}`);
    console.log(`Swagger docs available at ${PORT}/docs`);
});
