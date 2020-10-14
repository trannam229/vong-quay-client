const express = require('express');
const soap = require('soap');
// const url = 'https://bps.lendbiz.vn/BPSTEST/AuthenticateService.asmx?WSDL';
const args = {Username: '000028', Password: 'thanung'};


async function soapAuth() {
    try {
        const client = await soap.createClientAsync('https://bps.lendbiz.vn/BPSTEST/AuthenticateService.asmx?WSDL');
        // const auth = new soap.BasicAuthSecurity('000028', 'thanung');
        client.addSoapHeader({});
        // client.setSecurity(auth);
        const response = await client.LoginAsync({header: args})

        return response;

    } catch (e) {
        console.error(e.message);
    }
}

module.exports = soapAuth