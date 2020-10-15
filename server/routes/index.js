
const { loginLendbiz } = require('../controllers/auth');

const router = require('express').Router();

router.route('/login')
  .post(loginLendbiz);

module.exports = router;
