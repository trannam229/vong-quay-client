const soap = require('soap');
// const url = 'https://bps.lendbiz.vn/BPSTEST/AuthenticateService.asmx?WSDL';
const args = { Username: '000028', Password: 'thanung' };
soap.createClient('https://bps.lendbiz.vn/BPSTEST/AuthenticateService.asmx?WSDL', function (err, client) {
    if (err) console.error(err);
    else {
        client.Login({ header: args }, function (err, response, rawResponse, soapHeader, rawRequest) {
            if (err) {
                console.log(err.message);
                console.log(rawRequest, '\nloi roi ban oi');
            } else {
                console.log(rawResponse);
                // res.send(response);
            }
        });
    }
});
module.exports = {
    demo: 123,
};