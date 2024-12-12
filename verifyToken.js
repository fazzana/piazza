const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
  // Get token from the Authorization 
  const token = req.header('Authorization')

  // Check if token exists
  if (!token) {
    return res.status(401).json({ error: 'Access Denied. No token provided.' })
  }

  try {
    // Verify the token
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified// Attach the verified user data to the request object
    next()
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' })
  }
}

module.exports = verifyToken
