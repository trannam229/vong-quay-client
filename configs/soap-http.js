const soap = require('soap');
const {head} = require('lodash');

async function soapAuth(func, args) {
    try {
        const client = await soap.createClientAsync('https://bps.lendbiz.vn/BPSTEST/AuthenticateService.asmx?WSDL');
        const response = await client[`${func}Async`](args);
        return head(response);
    } catch (e) {
        console.error(e.message);
    }
}

async function soapTrading(func, args) {
  try {
      const client = await soap.createClientAsync('https://bps.lendbiz.vn/BPSTEST/OnlineTrading.asmx?WSDL');
      const response = await client[`${func}Async`](args);
      console.log(head(response));
      return head(response);
  } catch (e) {
      console.error(e.message);
  }
}

module.exports = {
    soapAuth,
    soapTrading
}