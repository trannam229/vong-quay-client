const { soapAuth } = require('../../configs/soap-http');

exports.loginLendbiz = async (req, res) => {
    try {
        const payload = req.body;
        const response = await soapAuth('Login', payload);
        res.send(response[0].LoginResult);
    } catch (error) {
        return res.json({ error });
    }
};