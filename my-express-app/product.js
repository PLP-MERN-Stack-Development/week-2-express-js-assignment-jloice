const express = require('express');
const router = express.Router();
const validateProduct = require('../middleware/validateProduct');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const asyncWrapper = require('../utils/asyncWrapper');

let products = [];
let currentId = 1;

// GET all
router.get('/', asyncWrapper(async (req, res) => {
  let { category, page = 1, limit = 5, search } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  let filtered = [...products];

  // Filter by category
  if (category) {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  // Search by name (case-insensitive)
  if (search) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const paginated = filtered.slice(startIndex, startIndex + limit);

  res.json({
    total: filtered.length,
    page,
    limit,
    results: paginated
  });
}));


// GET by ID
router.get('/stats', asyncWrapper(async (req, res) => {
  const stats = {};

  products.forEach(product => {
    const cat = product.category;
    stats[cat] = (stats[cat] || 0) + 1;
  });

  res.json({
    total: products.length,
    countByCategory: stats
  });
}));


// POST new product
router.post('/', validateProduct, asyncWrapper(async (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = { id: currentId++, name, description, price, category, inStock };
  products.push(newProduct);
  res.status(201).json(newProduct);
}));

// PUT update
router.put('/:id', validateProduct, asyncWrapper(async (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) throw new NotFoundError('Product not found');

  Object.assign(product, req.body);
  res.json(product);
}));

// DELETE
router.delete('/:id', asyncWrapper(async (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) throw new NotFoundError('Product not found');

  products.splice(index, 1);
  res.json({ message: 'Deleted successfully' });
}));

module.exports = router;
