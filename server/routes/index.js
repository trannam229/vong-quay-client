
const authCtr = require('../controllers/auth');
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

//Authenticate Service
router.post('/login', authCtr.loginLendbiz);
router.post('/change-password', auth, authCtr.changePassword);

//Online Trading
router.get('/account', auth, tradingCtr.account);
router.get('/re', auth, tradingCtr.re);
router.get('/price-board', auth, tradingCtr.getPriceBoard);
router.post('/getAutoInvests', auth, tradingCtr.getAutoInvests);
router.get('/bank-account', auth, tradingCtr.getBankAccount);
router.get('/transfer-money', auth, tradingCtr.getTransferMoney);
module.exports = router;
