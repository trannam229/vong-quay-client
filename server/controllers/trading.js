const { soapTrading } = require('../../configs/soap-http');

exports.account = async (req, res) => {
    try {
        const payload = req.body;
        const response = await soapTrading('GetAccount', payload);
        res.send(response[0].GetAccountResult);
    } catch (error) {
        return res.json({ error });
    }
};

exports.changePassword = async (req, res) => {
    try {
        const payload = req.body;
        const response = await soapAuth('ChangePassword', payload);
        res.send(response[0].ChangePasswordResult);
    } catch (error) {
        return res.json({ error });
    }
};

// comment thêm Re là gì
exports.re = async (req, res) => {
    try {
        const payload = req.body;
        const response = await soapTrading('GetRE', payload);
        res.send(response[0].GetREResult);
    } catch (error) {
        return res.json({ error });
    }
};
