
const { loginLendbiz } = require('../controllers/auth');
const { fetchOrders } = require('../controllers/order');
const router = require('express').Router();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const accessToken = req.cookies.access_token;
  if (!accessToken) {
    return res.status(403).json({ error: 'No credentials sent!' });
  }
  req.account = jwt.decode(accessToken);
  next();
};

router.post('/login', loginLendbiz);
router.get('/orders', auth, fetchOrders)
module.exports = router;
