function validateProduct(req, res, next) {
  const { name, description, price, category, inStock } = req.body;

  if (typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ message: 'Invalid or missing "name"' });
  }
  if (typeof description !== 'string') {
    return res.status(400).json({ message: 'Invalid or missing "description"' });
  }
  if (typeof price !== 'number' || price < 0) {
    return res.status(400).json({ message: '"price" must be a positive number' });
  }
  if (typeof category !== 'string') {
    return res.status(400).json({ message: 'Invalid or missing "category"' });
  }
  if (typeof inStock !== 'boolean') {
    return res.status(400).json({ message: '"inStock" must be a boolean' });
  }

  next();
}

module.exports = validateProduct;
