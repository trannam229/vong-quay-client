const { soapTrading } = require('../../configs/soap-http');

exports.re = async (req, res) => {
    try {
        const payload = req.body;
        const response = await soapTrading('GetRE', payload);
        res.send(response[0].GetREResult);
    } catch (error) {
        return res.json({ error });
    }
};