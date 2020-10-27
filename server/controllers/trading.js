const { soapTrading } = require('../../configs/soap-http');
const { successResponse, errorResponse } = require('../api-response');
exports.account = async (req, res) => {
    try {
        const payload = req.body;
        const response = await soapTrading('GetAccount', payload);
        return successResponse(res, response.GetAccountResult);
    } catch (e) {
        return errorResponse(res, e.message);
    }
};

exports.changePassword = async (req, res) => {
    try {
        const payload = req.body;
        const response = await soapAuth('ChangePassword', payload);
        return successResponse(res, response.ChangePasswordResult);
    } catch (e) {
        return errorResponse(res, e.message);
    }
};

// comment thêm Re là gì
exports.re = async (req, res) => {
    try {
        const payload = req.body;
        const response = await soapTrading('GetRE', payload);

        return successResponse(res, response.GetREResult);
    } catch (e) {
        return errorResponse(res, e.message);
    }
};


exports.priceBoard = async (req, res) => {
    try {
        
    } catch (e) {
        return errorResponse(res, e.message);
    }
}