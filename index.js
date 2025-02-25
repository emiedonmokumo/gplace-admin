import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import authRoute from './routes/authRoute.js';
import userRoute from './routes/userRoute.js'
import investorRoute from './routes/investorRoute.js';
import stripeRoute from './routes/stripeRoute.js';
import subscriptionRoute from './routes/subscriptionRoute.js';
import activityLogRoute from './routes/activityLogRoute.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import bodyParser from 'body-parser';
import xlsx from 'xlsx'
import fs from 'fs'
// import investors from "./investors.json" with { type: 'json' }

dotenv.config();
connectDB();

const PORT = process.env.PORT || 8080;
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
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    // security: [
    //     {
    //         bearerAuth: [],
    //     },
    // ],
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

// Serve static Swagger UI assets
app.use('/swagger-static', express.static(path.join(__dirname, 'node_modules', 'swagger-ui-dist')));

// Serve Swagger JSON
app.get('/swagger-static/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// Serve Swagger docs
app.use(
    '/docs',
    swaggerUi.serveFiles(null, { swaggerOptions: { url: '/swagger-static/swagger.json' } }),
    swaggerUi.setup(null, { swaggerOptions: { url: '/swagger-static/swagger.json' } })
);

// API routes
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute);
app.use('/api/investors', investorRoute);
app.use('/api/stripe', stripeRoute);
app.use('/api/subscription', subscriptionRoute);
app.use('/api/activity', activityLogRoute);

// Start the server

// API to read and format Excel data
// app.get('/api/sample/data', async (req, res) => {
//     try {
//         // Get query parameters for pagination
//         const page = parseInt(req.query.page) || 1; // Default to page 1
//         const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page

//         // Load the Excel file
//         const filePath = path.join(__dirname, 'DB_vf4.xlsx'); // Replace with your uploaded file's location if it's dynamic
//         const workbook = xlsx.readFile(filePath);

//         // Get the first sheet
//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];

//         // Parse the sheet into JSON
//         const rawData = xlsx.utils.sheet_to_json(sheet);

//         // Format the raw Excel data to match the `Investor` schema
//         const formattedData = rawData.map((item) => ({
//             companyInfo: {
//                 companyName: item['Company name'] || "",
//                 country: item['Country'] || "",
//                 city: item['City'] || "",
//                 website: item['Website'] || "",
//                 yearFounded: item['Year founded'],
//                 employeeNumber: item['Number of employees'],
//                 investorType: item['Investor type'] || "",
//                 description: item['Description'] || "",
//             },
//             investmentBio: {
//                 industry: item['Investment industry']?.split(',') || "",
//                 geography: item['Investment geographies']?.split(',') || "",
//                 dealsInLTM: item['# of deals in LTM'] || 0,
//                 medianDealSize: item['Median deal Size ($K)'] || 0,
//                 AUM: item['AUM ($K)'] || 0,
//                 dealsIn5Y: item['Deals in 5Y'] || 0,
//             },
//             targetInfo: {
//                 revenue: {
//                     from: item['Revenue ($K) - min'] || 0,
//                     to: item['Revenue ($K) - max'] || 0,
//                 },
//                 EBITDA: {
//                     from: item['EBITDA ($K) - min'] || 0,
//                     to: item['EBITDA ($K) - max'] || 0,
//                 },
//                 dealSize: {
//                     from: item['Deal size ($K) - min'] || 0,
//                     to: item['Deal size ($K) - max'] || 0,
//                 },
//             },
//             paidInfo: {
//                 valuation: {
//                     from: item['Valuation - min'] || 0,
//                     to: item['Valuation - max'] || 0,
//                 },
//                 revenue: {
//                     from: item['EV/Revenue - min'] || 0,
//                     to: item['EV/Revenue - max'] || 0,
//                 },
//                 EBITDA: {
//                     from: item['EV/EBITDA - min'] || 0,
//                     to: item['EV/EBITDA - max'] || 0,
//                 },
//             },
//             offeredPrice: {
//                 valuation: item['Offered Price Valuation'] || 0,
//                 revenue: item['Offered Price Revenue'] || 0,
//                 EBITDA: item['Offered Price EBITDA'] || 0,
//             },
//             primaryContact: {
//                 name: item['Primary Contact Name'] || "",
//                 surname: item['Primary Contact Surname'] || "",
//                 email: item['Primary Contact Email'] || "",
//                 phone: item['Primary Contact Phone'] || "",
//                 title: item['Primary Contact Title'] || "",
//             },
//             vertical: item['Vertical'],
//             status: item['Status'],
//         }));

//         // Optionally save to the database
//         // await Investor.insertMany(formattedData);

//         // Return the formatted data
//         const startIndex = (page - 1) * limit;
//         const endIndex = page * limit;
//         // Write the formatted data to a JSON file
//         // const filePathToSave = path.join(__dirname, 'investors.json');
//         fs.writeFileSync(filePathToSave, JSON.stringify(formattedData, null, 2), 'utf-8');


//         // Paginate the data
//         const paginatedData = formattedData.slice(startIndex, endIndex);

//         res.status(200).json(paginatedData);
//     } catch (error) {
//         console.error('Error processing data:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to process data',
//             error: error.message,
//         });
//     }
// });

// app.get('/api/xlsx/data', (req, res)=>{
//     try {
//         // Paginate the data
//         const page = parseInt(req.query.page) || 1; // Default to page 1
//         const limit = parseInt(req.query.limit) || 10;
//         const startIndex = (page - 1) * limit;
//         const endIndex = page * limit;
//         const paginatedData = investors.slice(startIndex, endIndex);

//         res.status(200).json(paginatedData)
//     } catch (error) {
//         res.status(500).json({ message: error })
//     }
// })

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
});
