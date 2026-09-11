require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const { connectDB } = require('./config/database');

const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const transactionRoutes = require('./routes/transaction.routes');
const forecastRoutes = require('./routes/forecast.routes');
const orderRoutes = require('./routes/order.routes');
const alertRoutes = require('./routes/alert.routes');
const analyticsRoutes = require('./routes/analytics.routes');

const { startPOScheduler } = require('./utils/poScheduler');

const app = express();


// PORT

const PORT = process.env.PORT || 3000;


// CORS CONFIGURATION

// Add your frontend URLs here
const allowedOrigins = [
    'http://localhost:4200',
    'http://localhost:4201',

    // Vercel production URLs
    'https://smartshelfx.vercel.app',
    'https://smartshelfx-frontend.vercel.app'
];

// Check if origin is allowed
const isAllowedOrigin = (origin) => {

    // Requests without Origin header
    // Example: Postman, mobile apps, server-to-server
    if (!origin) {
        return true;
    }

    // Exact allowed origins
    if (allowedOrigins.includes(origin)) {
        return true;
    }

    // Allow Vercel preview deployments
    if (/^https:\/\/[a-zA-Z0-9-]+\.vercel\.app$/.test(origin)) {
        return true;
    }

    return false;
};


app.use(
    cors({
        origin: (origin, callback) => {

            if (isAllowedOrigin(origin)) {
                callback(null, true);
            } else {
                console.error(`❌ CORS blocked: ${origin}`);
                callback(new Error(`CORS blocked: ${origin}`));
            }
        },

        methods: [
            'GET',
            'POST',
            'PUT',
            'DELETE',
            'PATCH',
            'OPTIONS'
        ],

        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Accept'
        ],

        credentials: true
    })
);


// BODY PARSER

app.use(
    express.json({
        limit: '10mb'
    })
);

app.use(
    express.urlencoded({
        extended: true,
        limit: '10mb'
    })
);


// STATIC UPLOADS

app.use(
    '/uploads',
    express.static(path.join(__dirname, 'uploads'))
);


// ROOT ROUTE


app.get('/', (req, res) => {

    res.json({
        status: 'ok',
        message: 'SmartShelfX API is running',
        version: '2.0.0'
    });

});


// HEALTH CHECK

app.get('/api/health', (req, res) => {

    res.json({
        status: 'ok',
        service: 'SmartShelfX API',
        version: '2.0.0',
        timestamp: new Date().toISOString()
    });

});


// API ROUTES

app.use('/api/auth', authRoutes);

app.use('/api/products', productRoutes);

app.use('/api/transactions', transactionRoutes);

app.use('/api/forecast', forecastRoutes);

app.use('/api/orders', orderRoutes);

app.use('/api/alerts', alertRoutes);

app.use('/api/analytics', analyticsRoutes);


// 404 HANDLER

app.use((req, res) => {

    res.status(404).json({
        error: `Route not found: ${req.method} ${req.path}`
    });

});


// GLOBAL ERROR HANDLER


app.use((err, req, res, next) => {

    console.error('❌ [ERROR]', err.message);

    res.status(err.status || 500).json({
        error: err.message || 'Internal server error'
    });

});


// START SERVER

const start = async () => {

    try {

        // Connect to MongoDB first
        await connectDB();

        // Start Express server
        app.listen(PORT, '0.0.0.0', () => {

            console.log('');
            console.log('==========================================');
            console.log('🚀 SmartShelfX API Started');
            console.log('==========================================');
            console.log(`📡 Port: ${PORT}`);
            console.log(`🌐 Local: http://localhost:${PORT}`);
            console.log(`❤️ Health: http://localhost:${PORT}/api/health`);
            console.log('🗄️ MongoDB: Connected');
            console.log('==========================================');
            console.log('');

            // Start Purchase Order scheduler
            startPOScheduler();

            console.log('⏰ PO Scheduler started');

        });

    } catch (err) {

        console.error('');
        console.error('==========================================');
        console.error('❌ STARTUP FAILED');
        console.error('==========================================');
        console.error(err.message);
        console.error('==========================================');
        console.error('');

        process.exit(1);

    }

};


// Start application
start();