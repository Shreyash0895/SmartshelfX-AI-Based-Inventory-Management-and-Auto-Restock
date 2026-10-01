require('dotenv').config();

const express = require('express');
const cors    = require('cors');
const path    = require('path');
const https   = require('https');
const { connectDB } = require('./config/database');

const authRoutes        = require('./routes/auth.routes');
const productRoutes     = require('./routes/product.routes');
const transactionRoutes = require('./routes/transaction.routes');
const forecastRoutes    = require('./routes/forecast.routes');
const orderRoutes       = require('./routes/order.routes');
const alertRoutes       = require('./routes/alert.routes');
const analyticsRoutes   = require('./routes/analytics.routes');
const { startPOScheduler } = require('./utils/poScheduler');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── CORS ──────────────────────────────────────────────────────────
const allowedOrigins = [
    'http://localhost:4200',
    'http://localhost:4201',
    'https://smartshelf-x-ai-based-inventory-man.vercel.app',
    /\.vercel\.app$/
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        const allowed = allowedOrigins.some(o =>
            typeof o === 'string' ? o === origin : o.test(origin)
        );
        if (allowed) return callback(null, true);
        return callback(new Error(`CORS blocked: ${origin}`));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true
}));

app.options('*', cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => res.json({
    status: 'ok',
    message: 'SmartShelfX API is running',
    version: '2.0.0'
}));

app.get('/api/health', (req, res) => res.json({
    status: 'ok', service: 'SmartShelfX API',
    version: '2.0.0', timestamp: new Date().toISOString()
}));

app.use('/api/auth',         authRoutes);
app.use('/api/products',     productRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/forecast',     forecastRoutes);
app.use('/api/orders',       orderRoutes);
app.use('/api/alerts',       alertRoutes);
app.use('/api/analytics',    analyticsRoutes);

// 404
app.use((req, res) => res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` }));

// Global error handler
app.use((err, req, res, next) => {
    console.error('[ERROR]', err.message);
    res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

// ── Self-Ping Keep-Alive ──────────────────────────────────────────
// Pings own health endpoint every 14 minutes to prevent
// Render free tier from sleeping — completely permanent solution!
const keepAlive = () => {
    if (process.env.NODE_ENV !== 'production') return;

    const RENDER_URL = process.env.RENDER_EXTERNAL_URL ||
                       'https://smartshelfx-ai-based-inventory.onrender.com';
    const INTERVAL   = 14 * 60 * 1000; // 14 minutes in ms

    setInterval(() => {
        const url = `${RENDER_URL}/api/health`;
        https.get(url, (res) => {
            console.log(`[KeepAlive] ✅ Pinged ${url} → HTTP ${res.statusCode}`);
        }).on('error', (err) => {
            console.error('[KeepAlive] ❌ Ping failed:', err.message);
        });
    }, INTERVAL);

    console.log('[KeepAlive] Self-ping started — runs every 14 minutes');
};

const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`✅ SmartShelfX API running on http://localhost:${PORT}`);
            console.log(`   Health check: http://localhost:${PORT}/api/health`);
            startPOScheduler();
            keepAlive();
        });
    } catch (err) {
        console.error('❌ Startup failed:', err.message);
        process.exit(1);
    }
};

start();