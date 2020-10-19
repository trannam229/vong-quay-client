const { soapAuth } = require('../../configs/soap-http');

exports.fetchOrders = async (req, res) => {
    try {
        console.log(req.account)
        res.send({demo: 1232});
    } catch (error) {
        return res.json({ error });
    }
};