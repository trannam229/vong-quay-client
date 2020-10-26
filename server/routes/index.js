
const { loginLendbiz } = require('../controllers/auth');
const { fetchOrders } = require('../controllers/order');
const { account } = require('../controllers/account');
const { re } = require('../controllers/re');
const { changePassword } = require('../controllers/changePassword');

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
router.get('/orders', auth, fetchOrders);
router.post('/account', auth, account);
router.post('/re', auth, re);
router.post('/changePassword', auth, changePassword);

module.exports = router;
