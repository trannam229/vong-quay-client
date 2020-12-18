
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
router.get('/price-board-hkd', auth, tradingCtr.getPriceBoardHKD);
router.get('/deal-to-sell', auth, tradingCtr.getDealToSell);
router.get('/bank-account', auth, tradingCtr.getBankAccount);
router.get('/transfer-money', auth, tradingCtr.getTransferMoney);
router.post('/transfer-money', auth, tradingCtr.postTransferMoney);
router.get('/get-auto-invests', auth, tradingCtr.getAutoInvests);
router.post('/create-auto-invest', auth, tradingCtr.createAutoInvestRule);
router.post('/update-auto-invest', auth, tradingCtr.updateAutoInvestRule);
router.get('/nar', auth, tradingCtr.getNar);
router.get('/ci', auth, tradingCtr.getCI);
router.get('/ln', auth, tradingCtr.getLN);
router.get('/order-book', auth, tradingCtr.getOrderBook);
router.get('/all-income-report', auth, tradingCtr.getAllIncomeReport);
router.get('/income-by-time', auth, tradingCtr.getIncomeByTime);
router.get('/sectors', auth, tradingCtr.getSectors);
router.get('/chart-info', auth, tradingCtr.getChartInfo);
router.post('/ireg', auth, tradingCtr.ireg);
router.post('/ireg-to-sell', auth, tradingCtr.iRegToSell);

module.exports = router;
