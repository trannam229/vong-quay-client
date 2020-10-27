
const { loginLendbiz } = require('../controllers/auth');
const tradingCtr = require('../controllers/trading');

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
router.post('/account', auth, tradingCtr.account);
router.post('/re', auth, tradingCtr.re);
router.post('/changePassword', auth, tradingCtr.changePassword);
router.get('/price-board', auth, tradingCtr.getPriceBoard);
module.exports = router;
