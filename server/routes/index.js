
const { loginLendbiz } = require('../controllers/auth');
const { fetchOrders } = require('../controllers/order');
const router = require('express').Router();

router.route('/login')
  .post(loginLendbiz);

router.route('/orders')
  .get(fetchOrders)
module.exports = router;
