const { soapAuth } = require('../../configs/soap-http');

exports.changePassword = async (req, res) => {
    try {
        const payload = req.body;
        const response = await soapAuth('ChangePassword', payload);
        res.send(response[0].ChangePasswordResult);
    } catch (error) {
        return res.json({ error });
    }
};