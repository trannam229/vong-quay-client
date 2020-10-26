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