const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const errorHandler = require('./middlewares/errorHandler');
const routes = require('./routes');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { swaggerUi, swaggerSpec } = require('./swagger');

dotenv.config();

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

// Rate-Limiters
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // limit 100 req per 15 mins
}));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use(routes);
app.use(errorHandler);

// Default route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Start server
module.exports = app;
