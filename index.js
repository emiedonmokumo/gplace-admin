import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import investorRoute from './routes/investorRoute.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

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
};
const options = {
    swaggerDefinition,
    apis: ['./routes/*.js', './routes/*.mjs'], // path to the API route files
};

// Create swagger spec
const swaggerSpec = swaggerJsdoc(options);

app.use(express.json());

// Serve swagger docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/investor', investorRoute);

app.listen(PORT || 8080, () => {
    console.log(`Server running on ${PORT}`);
    console.log(`Swagger docs available at ${PORT}/docs`);
});
