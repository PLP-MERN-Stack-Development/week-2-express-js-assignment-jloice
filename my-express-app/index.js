const express = require('express');
const logger = require('./middleware/logger');
const authenticate = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');
const productsRouter = require('./routes/products');

const app = express();

app.use(logger);
app.use(express.json());
app.use(authenticate);

app.use('/api/products', productsRouter);

// Global error handler (must come last)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
