const { soapAuth } = require('../../configs/soap-http');
const { successResponse, errorResponse } = require('../api-response');

exports.loginLendbiz = async (req, res) => {
    try {
        const payload = req.body;
        const response = await soapAuth('Login', payload);
        return successResponse(res, response[0].LoginResult);
    } catch (e) {
        return errorResponse(res, e.message);
    }
};