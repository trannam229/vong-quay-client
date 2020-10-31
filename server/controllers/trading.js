const { soapTrading } = require('../../configs/soap-http');
const { successResponse, errorResponse } = require('../api-response');

exports.account = async (req, res) => {
    try {
        const params = Object.assign(req.query, { header: { Sessionid: req.account.CfInfo.SessionID } });
        const response = await soapTrading('GetAccount', params);
        return successResponse(res, response.GetAccountResult);
    } catch (e) {
        return errorResponse(res, e.message);
    }
};

// RE: reference
exports.re = async (req, res) => {
    try {
        const params = Object.assign(req.query, { header: { Sessionid: req.account.CfInfo.SessionID } });
        const response = await soapTrading('GetRE', params);
        return successResponse(res, response.GetREResult);
    } catch (e) {
        return errorResponse(res, e.message);
    }
};


exports.getPriceBoard = async (req, res) => {
    try {
        const header = {
            Sessionid: req.account.CfInfo.SessionID,
        };
        const response = await soapTrading('GetPriceBoard', { header });
        return successResponse(res, response);

    } catch (e) {
        return errorResponse(res, e.message);
    }
}

exports.getAutoInvests = async (req, res) => {
    try {
        const payload = req.body;
        const response = await soapTrading('GetAutoInvests', payload);
        return successResponse(res, response);
    } catch (e) {
        return errorResponse(res, e.message);
    }
};

exports.getBankAccount = async (req, res) => {
  try {
      const params = { 
        header: { Sessionid: req.account.CfInfo.SessionID },
        pv_Custid: req.account.CfInfo.CustID
      };
      const response = await soapTrading('GetBankAccount', params);
      return successResponse(res, response.GetBankAccountResult);
  } catch (e) {
      return errorResponse(res, e.message);
  }
};

exports.getTransferMoney = async (req, res) => {
  try {
      const params = { 
        header: { Sessionid: req.account.CfInfo.SessionID },
        pv_Custid: req.account.CfInfo.CustID
      };
      const response = await soapTrading('GetTransferMoney', params);
      return successResponse(res, response.GetTransferMoneyResult);
  } catch (e) {
      return errorResponse(res, e.message);
  }
};

exports.postTransferMoney = async (req, res) => {
  try {
      req.body.header = {
        Sessionid: req.account.CfInfo.SessionID,
        Password: req.account.Password
      }
      req.body.pv_CustID = req.account.CfInfo.CustID;
      const payload = req.body;
      console.log(payload);
      const response = await soapTrading('TransferMoney', payload);
      return successResponse(res, response.TransferMoneyResult);
  } catch (e) {
      return errorResponse(res, e.message);
  }
};