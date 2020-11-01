const { soapAuth } = require('../../configs/soap-http');
const { successResponse, errorResponse } = require('../api-response');

exports.loginLendbiz = async (req, res) => {
    try {
        const payload = req.body;
        const response = await soapAuth('Login', payload);
        return successResponse(res, response.LoginResult);
    } catch (e) {
        return errorResponse(res, e.message);
    }
};

exports.changePassword = async (req, res) => {
  try {
      req.body.header.Sessionid = req.account.CfInfo.SessionID;
      const payload = req.body;
      const response = await soapAuth('ChangePassword', payload);
      return successResponse(res, response.ChangePasswordResult);
  } catch (e) {
      return errorResponse(res, e.message);
  }
};
