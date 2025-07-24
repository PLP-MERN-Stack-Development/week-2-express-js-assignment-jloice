function authenticate(req, res, next) {
  const apiKey = req.header('x-api-key');
  if (apiKey !== 'my-secret-key') {
    return res.status(403).json({ message: 'Forbidden: Invalid API Key' });
  }
  next();
}

module.exports = authenticate;
