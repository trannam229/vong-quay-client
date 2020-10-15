const soap = require('soap');
// const url = 'https://bps.lendbiz.vn/BPSTEST/AuthenticateService.asmx?WSDL';
const args = {Username: '000028', Password: 'thanung'};


async function soapAuth() {
    try {
        const func = 'Login'
        const client = await soap.createClientAsync('https://bps.lendbiz.vn/BPSTEST/AuthenticateService.asmx?WSDL');
        const response = await client[`${func}Async`]({header: args})

        return response;

    } catch (e) {
        console.error(e.message);
    }
}

module.exports = {
    soapAuth
}