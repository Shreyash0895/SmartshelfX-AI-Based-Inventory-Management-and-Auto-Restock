# SmartShelfX — AI-Powered Inventory Management & Auto-Restock Platform

![SmartShelfX](https://img.shields.io/badge/SmartShelfX-v3.0.0-00b4ff?style=for-the-badge)
![Angular](https://img.shields.io/badge/Angular-19-DD0031?style=for-the-badge&logo=angular)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
![Python](https://img.shields.io/badge/Python-ML_Service-3776AB?style=for-the-badge&logo=python)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=for-the-badge&logo=jsonwebtokens)
![Chart.js](https://img.shields.io/badge/Charts-Chart.js-FF6384?style=for-the-badge&logo=chartdotjs)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?style=for-the-badge&logo=vercel)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker)
![CI/CD](https://img.shields.io/badge/CI/CD-GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions)

> SmartShelfX is a next-generation, full-stack inventory management platform that uses AI-powered demand forecasting to analyze historical sales, seasonal trends, and real-time data — and automatically recommends or triggers restocking operations. Built using Angular 19, Node.js, MongoDB Atlas, and Python ML service — deployed on Vercel and Render with a full CI/CD pipeline using GitHub Actions and Docker.

---

## 🌐 Live Demo

| Service | URL |
|---------|-----|
| **Frontend** | https://smartshelfx.vercel.app |


---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Running the Project](#-running-the-project)
- [Docker & DevOps](#-docker--devops)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Deployment](#-deployment)
- [API Endpoints](#-api-endpoints)
- [User Roles](#-user-roles)
- [Usage Guide](#-usage-guide)
- [Database Models](#-database-models)
- [Database Schema](#-database-schema)
- [Email Notifications](#-email-notifications)
- [Contributing](#-contributing)

---

## ✨ Features

### 🤖 AI & Forecasting
- AI-powered demand forecasting using Python ML service (scikit-learn LinearRegression)
- Predicts stock requirements for the next **7 / 14 / 30 days**
- Risk level classification: **LOW / MEDIUM / HIGH / CRITICAL**
- Auto-triggers purchase orders for HIGH/CRITICAL risk products
- Manual forecast run by Admin/Manager at any time
- Scrollable bar chart showing **predicted demand vs current stock** for all products
- Doughnut chart showing **risk distribution** across all products
- One-click **Notify Vendors** button — sends alerts based on forecast or current stock levels
- Model evaluated using **MAE and MAPE** compared against naive baseline

### 📦 Inventory Management
- Full product CRUD with SKU, category, vendor, expiry date
- Real-time stock tracking with IN/OUT transactions
- Bulk product import via CSV, Excel (.xlsx), TSV, ODS files
- Smart column auto-mapping on file import
- Stock status filters: In Stock, Low, Critical, Out of Stock
- **20+ pre-loaded product categories** (Electronics, Mobiles, Computers, Furniture, Healthcare, etc.)
- Category input supports both free typing and suggestions from existing data

### 🔔 Smart Alerts
- Automatic LOW_STOCK, OUT_OF_STOCK, EXPIRY alerts
- AI-generated RESTOCK_SUGGESTED alerts
- Vendor-specific alert feed
- Mark as read / dismiss alerts
- Filter by alert type and read/unread status

### 📊 Analytics Dashboard
- KPI summary: Total Products, Low Stock, Out of Stock, Pending Orders, Total Stock Units, POs Delivered
- **Stock Movement chart** with period selector (Day / Month / Year)
- **PO Status Breakdown** doughnut chart
- **Stock by Category** doughnut chart
- **Top 10 most restocked products** with bar visualization
- Low Stock & Critical Products table

### 📈 Reports & Analytics

Three dedicated report tabs — each exportable as CSV:

#### 🔄 Auto-Reorder Suggestions
- Calculates **average daily usage** from last 30 days of stock-out transactions
- Calculates **lead time demand** (avg daily usage × lead time days)
- Calculates **safety stock** (50% buffer over lead time demand)
- Shows **days until stockout** per product
- Shows **recommended order quantity** and **estimated cost**
- **One-click Create PO** button directly from the table
- Highlights products that already have open POs

#### 💰 Inventory Valuation Report
- **Total inventory value** (current stock × unit price across all products)
- **Value at risk** — value tied up in low/out-of-stock products
- **Dead stock count** — out-of-stock products with unit price > 0
- **Category-wise valuation** with percentage share bar
- **Top 5 most valuable products** ranked by total value

#### ⭐ Vendor Performance Report
- **Performance score (0–100)** per vendor based on weighted formula
- **Star rating**: ⭐⭐⭐⭐⭐ Excellent / ⭐⭐⭐⭐ Good / ⭐⭐⭐ Average / ⭐⭐ Below Average / ⭐ Poor
- **Fulfillment rate** — delivered orders vs actionable orders
- **Rejection rate** — cancelled orders as percentage of total
- **Avg response time** in hours between PO creation and vendor action
- **Total quantity supplied** and **total value supplied**
- Beautiful vendor cards UI with animated score progress bar

### 🛒 Purchase Order Workflow
- Auto-generated POs when stock is LOW/CRITICAL
- Manual PO creation by Admin/Manager
- Vendor approves or cancels POs
- Status pipeline: **PENDING → APPROVED → DISPATCHED → DELIVERED / CANCELLED**
- Email notifications to vendors on new POs
- Email notifications to managers when vendor approves/rejects

### 👥 User Management
- Admin can **delete any user** directly from User Management page
- Admin can **reset any user's password** with strong password validation
- Password strength validation (uppercase, lowercase, number, special character)
- User list with role badges, search by name/email, and filter by role

### 🔐 Authentication & Roles
- JWT-based authentication with 24-hour token expiry
- Three role types: ADMIN, MANAGER, VENDOR
- Separate **Admin login portal** (port 4201 locally)
- Role-based route protection with Angular Guards
- Port-based automatic routing

### ⏰ Background Scheduler
- Runs every **2 minutes** automatically
- Auto-scans all products for HIGH/CRITICAL stock levels
- Auto-creates POs and emails vendors if no open PO exists

### 🐳 DevOps & Deployment
- **Dockerized** — all 3 services have multi-stage Dockerfiles
- **Docker Compose** for local full-stack testing with one command
- **CI/CD Pipeline** via GitHub Actions — auto test, build, and deploy on push to main
- **Frontend** deployed on **Vercel**
- **Backend** deployed on **Render**
- **Database** on **MongoDB Atlas** (cloud)

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Angular 19 (Standalone Components) |
| **UI Charts** | Chart.js 4 (Bar, Doughnut, Line) |
| **Fonts** | Orbitron, Rajdhani, JetBrains Mono |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (via Mongoose ODM) |
| **Authentication** | JWT (jsonwebtoken), bcryptjs |
| **ML Service** | Python — scikit-learn, pandas, numpy, FastAPI |
| **Email** | Nodemailer (Gmail SMTP) |
| **File Import** | csv-parser, xlsx |
| **HTTP Client** | Axios (backend → ML service) |
| **Scheduler** | Node.js setInterval (2-min background PO check) |
| **Containerization** | Docker (multi-stage builds) |
| **Orchestration** | Docker Compose |
| **CI/CD** | GitHub Actions |
| **Frontend Hosting** | Vercel |
| **Backend Hosting** | Render |
| **Database Hosting** | MongoDB Atlas |

---



## ✅ Prerequisites

| Tool | Version | Download |
|------|---------|----------|
| **Node.js** | v18+ | https://nodejs.org |
| **npm** | v9+ | Comes with Node.js |
| **MongoDB** | Atlas (cloud) | https://cloud.mongodb.com |
| **Python** | v3.9+ | https://www.python.org/downloads |
| **Angular CLI** | v19 | `npm install -g @angular/cli` |
| **Git** | Latest | https://git-scm.com |
| **Docker** *(optional)* | Latest | https://www.docker.com/products/docker-desktop |

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Shreyash0895/SmartshelfX-AI-Based-Inventory-Management-and-Auto-Restock.git
cd SmartshelfX-AI-Based-Inventory-Management-and-Auto-Restock
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file (see [Environment Variables](#-environment-variables)), then:

```bash
node server.js
```

You should see:
```
✅ MongoDB connected.
✅ SmartShelfX API running on http://localhost:3000
[Scheduler] PO auto-check started — runs every 2 minutes.
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
node start-dev.js
```

Wait ~30-60 seconds:
```
✔ [ADMIN] Ready → http://localhost:4201
✔ [USERS] Ready → http://localhost:4200
```

### 4. ML Service Setup

```bash
cd ../ml-service
pip install -r requirements.txt
python main.py
```

ML service starts on `http://localhost:8000`

### 5. Create Admin User (First Time Only)

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Admin\",\"email\":\"admin@smartshelfx.com\",\"password\":\"Admin@123\",\"role\":\"ADMIN\"}"
```

---

## 🔧 Environment Variables

Create `.env` in the `backend/` folder:

```env
PORT=3000
NODE_ENV=production

# MongoDB Atlas
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/smartshelfx?retryWrites=true&w=majority

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=24h

# ML Service
ML_SERVICE_URL=http://localhost:8000

# Gmail SMTP (use App Password)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_char_app_password
SMTP_FROM=SmartShelfX <noreply@smartshelfx.com>

# Frontend URL
APP_URL=http://localhost:4200
```

> **Note:** For Gmail use an **App Password** — Google Account → Security → 2-Step Verification → App Passwords

---

## ▶️ Running the Project

### Option A — Normal (Without Docker)

| Step | Command | URL |
|------|---------|-----|
| 1. MongoDB | Start MongoDB locally or use Atlas | — |
| 2. Backend | `cd backend && node server.js` | http://localhost:3000 |
| 3. ML Service | `cd ml-service && python main.py` | http://localhost:8000 |
| 4. Frontend | `cd frontend && node start-dev.js` | http://localhost:4200 / 4201 |

### Option B — With Docker Compose

```bash
# Run entire stack with one command
docker-compose up --build

# App available at http://localhost
# Stop with:
docker-compose down
```

---

## 🐳 Docker & DevOps

### Dockerfiles

Each service has its own multi-stage Dockerfile:

| Service | Base Image | Final Size |
|---------|-----------|-----------|
| Backend | node:18-alpine | ~150MB |
| Frontend | node:18-alpine + nginx:alpine | ~25MB |
| ML Service | python:3.11-slim | ~200MB |

### Build Images Manually

```bash
# Backend
docker build -t YOUR_USERNAME/smartshelfx-backend:latest ./backend

# Frontend
docker build -t YOUR_USERNAME/smartshelfx-frontend:latest ./frontend

# ML Service
docker build -t YOUR_USERNAME/smartshelfx-ml:latest ./ml-service
```

### Push to Docker Hub

```bash
docker login
docker push YOUR_USERNAME/smartshelfx-backend:latest
docker push YOUR_USERNAME/smartshelfx-frontend:latest
docker push YOUR_USERNAME/smartshelfx-ml:latest
```

---

## 🔄 CI/CD Pipeline

Every push to `main` branch automatically:

```
git push origin main
        ↓
GitHub Actions triggers
        ↓
Job 1: Test backend (syntax check all files)
Job 2: Build Angular production bundle
        ↓
Job 3: Deploy backend to Render
Job 4: Deploy frontend to Vercel
        ↓
Live app updated — zero manual steps!
```

### GitHub Secrets Required

| Secret | Description |
|--------|-------------|
| `RENDER_DEPLOY_HOOK_BACKEND` | Render → Service → Settings → Deploy Hook |
| `VERCEL_TOKEN` | Vercel → Settings → Tokens |
| `VERCEL_ORG_ID` | Vercel → Settings → General → Team ID |
| `VERCEL_PROJECT_ID` | Vercel → Project → Settings → Project ID |

---

## 🌍 Deployment

### Architecture

```
User Browser
     ↓
Vercel (Frontend — Angular 19)
     ↓ API calls
Render (Backend — Node.js + Express)
     ↓
MongoDB Atlas (Cloud Database)
```

### Deploy Backend to Render

1. Go to https://render.com → New Web Service
2. Connect GitHub repo
3. Set Root Directory: `backend`
4. Build Command: `npm install`
5. Start Command: `node server.js`
6. Add environment variables
7. Deploy → get URL like `https://smartshelfx-backend.onrender.com`

### Deploy Frontend to Vercel

1. Go to https://vercel.com → New Project
2. Import GitHub repo
3. Set Root Directory: `frontend`
4. Build Command: `npx ng build --configuration production`
5. Output Directory: `dist/smartshelfx/browser`
6. Deploy → get URL like `https://smartshelfx.vercel.app`

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login and get JWT token |
| GET | `/api/auth/me` | All roles | Get current user profile |
| GET | `/api/auth/users` | All roles | List all users |
| DELETE | `/api/auth/users/:id` | Admin only | Delete a user |
| POST | `/api/auth/admin-reset-password` | Admin only | Reset any user's password |

### Products
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/products` | All | List products (search, filter, paginate) |
| GET | `/api/products/categories` | All | Get distinct categories |
| GET | `/api/products/:id` | All | Get single product |
| POST | `/api/products` | Admin/Manager | Create product |
| PUT | `/api/products/:id` | Admin/Manager | Update product |
| DELETE | `/api/products/:id` | Admin only | Delete product |
| POST | `/api/products/import-sheet` | Admin/Manager | Bulk import from file |
| POST | `/api/products/preview-sheet` | Admin/Manager | Preview file before import |

### Transactions
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/transactions` | All | List transactions |
| POST | `/api/transactions` | Admin/Manager | Record stock IN/OUT |
| GET | `/api/transactions/product/:id` | All | Transactions for a product |

### Purchase Orders
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/orders` | All | List orders |
| GET | `/api/orders/suggestions` | All | AI-suggested restock orders |
| POST | `/api/orders` | Admin/Manager | Create purchase order |
| PUT | `/api/orders/:id/status` | All | Update order status |

### Forecast
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/forecast` | All | Get all forecast results |
| POST | `/api/forecast/run` | Admin/Manager | Trigger AI forecast |
| GET | `/api/forecast/:product_id` | All | Forecast for a product |
| POST | `/api/forecast/trigger-alerts` | Admin/Manager | Re-create forecast alerts |

### Alerts
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/alerts` | Vendor | Get vendor alerts |
| PUT | `/api/alerts/read-all` | Vendor | Mark all as read |
| PUT | `/api/alerts/:id/read` | Vendor | Mark single alert as read |
| DELETE | `/api/alerts/:id` | Vendor | Dismiss alert |

### Analytics & Reports
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/analytics/summary` | All | KPI summary cards |
| GET | `/api/analytics/stock-trend` | All | 6-month stock trend |
| GET | `/api/analytics/top-restocked` | All | Top 10 restocked products |
| GET | `/api/analytics/category-breakdown` | All | Stock by category |
| GET | `/api/analytics/low-stock` | All | Low/out of stock products |
| GET | `/api/analytics/valuation` | All | Full inventory valuation report |
| GET | `/api/analytics/reorder-suggestions` | All | Auto-reorder with recommended qty & cost |
| GET | `/api/analytics/vendor-performance` | Admin/Manager | Vendor scores, fulfillment, response time |

---

## 👥 User Roles

| Role | Permissions |
|------|------------|
| **ADMIN** | Full access — manage users (add/delete/reset password), products, orders, forecasts, all analytics & reports |
| **MANAGER** | Create/edit products, record transactions, create orders, run AI forecasts, view analytics & reports |
| **VENDOR** | View their own purchase orders, approve/cancel POs, receive alerts |

### Login URLs

| Environment | Portal | URL |
|-------------|--------|-----|
| Local | Manager / Vendor | http://localhost:4200 |
| Local | Admin | http://localhost:4201 |
| Production | All users | https://smartshelfx.vercel.app |


---

## 📖 Usage Guide

### First Time Setup
1. Start all services or use the live deployment
2. Create admin user using the curl command above
3. Login as Admin

### Adding Products
1. Login as **Admin** or **Manager** → **Inventory → Products Catalog**
2. Click **+ Add Product** (20+ category suggestions available)
3. Or use **Import Sheet** to bulk upload CSV/Excel

### Recording Stock Transactions
1. Go to **Stock Transactions**
2. Use **Stock-In** for incoming stock, **Stock-Out** for dispatch/sales
3. Alerts and POs auto-triggered when stock drops to reorder level

### Running AI Forecast
1. Go to **AI Forecasting** → Click **Run Forecast Now**
2. ML analyses transaction history → assigns risk levels
3. HIGH/CRITICAL products get alerts and POs automatically
4. Use **Notify Vendors** to manually alert vendors

### Viewing Reports
1. Go to **Reports & Analytics**
2. **Auto-Reorder tab** — recommended quantities, costs, one-click PO creation
3. **Inventory Valuation tab** — total stock value and category breakdown
4. **Vendor Performance tab** — scores, fulfillment rates, star ratings
5. **Export CSV** on any tab to download data

### Managing Users (Admin)
1. Go to **User Management**
2. 🗑 **Delete** button to remove a user
3. 🔑 **Reset** button to change a user's password

### Managing Purchase Orders (Vendor)
1. Login as **Vendor**
2. Go to **Purchase Orders** → **Approve** or **Cancel**
3. Managers notified by email automatically

---

## 🗄️ Database Models

| Model | Collection | Description |
|-------|-----------|-------------|
| `User` | `users` | System users with roles (ADMIN/MANAGER/VENDOR) |
| `Product` | `products` | Inventory items with SKU, stock levels, pricing, expiry |
| `StockTransaction` | `stocktransactions` | Every stock IN/OUT movement with handler tracking |
| `PurchaseOrder` | `purchaseorders` | Restock orders with full status pipeline |
| `Alert` | `alerts` | Vendor-targeted notifications (4 types) |
| `ForecastResult` | `forecastresults` | AI model output per product per date with confidence score |

---

## 📐 Database Schema

### Star Schema (Analytics)
```
fact_stock_transactions (center)
    ├── dim_product
    ├── dim_user
    ├── dim_date
    ├── dim_alert_type
    └── dim_order_status
```

### Snowflake Schema (Normalized)
```
fact_stock_transactions
    ├── dim_product
    │   ├── dim_category
    │   └── dim_vendor
    ├── dim_user
    │   └── dim_role
    └── dim_date
        └── dim_month
```

---

## 📧 Email Notifications

SmartShelfX sends automated emails in two scenarios:

1. **New Purchase Order → Vendor**
   - Triggered when PO is created (manual or auto-generated)
   - Contains order ID, product details, quantity, and review link

2. **Vendor Decision → All Managers**
   - Triggered when vendor approves or cancels a PO
   - Contains decision, product details, vendor name, order summary

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Shreyash Jokare**
GitHub: [@Shreyash0895](https://github.com/Shreyash0895)

---

*Built with ❤️ using Angular 19, Node.js, MongoDB Atlas, Python ML, Docker & GitHub Actions*
