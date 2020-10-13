// const express = require('express')
// const next = require('next')

// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev })
// const handle = app.getRequestHandler()


// const soap = require('soap');
// const url = 'https://bps.lendbiz.vn/BPSTEST/AuthenticateService.asmx?WSDL';
// const args = { Username: '000028', Password: 'thanung' };
// soap.createClient(__dirname + '/auth.wsdl', 
// { fixedPath: true }
//     , function (err, client) {
//         // console.log(client);
//         client.Login(args, function (err, result, rawResponse, soapHeader, rawRequest) {
//             console.log(rawResponse);
//             console.log(rawRequest);
//         });
//     });

// app.prepare()
//     .then(() => {
//         const server = express()

//         server.get('*', (req, res) => {
//             return handle(req, res)
//         })

//         server.listen(3000, (err) => {
//             if (err) throw err
//             console.log('> Ready on http://localhost:3000')
//         })
//     })
//     .catch((ex) => {
//         console.error(ex.stack)
//         process.exit(1)
//     })


const express = require('express');
const soap = require('soap');
// const url = 'https://bps.lendbiz.vn/BPSTEST/AuthenticateService.asmx?WSDL';
const args = {Username: '000028', Password: 'thanung'};
soap.createClient('https://bps.lendbiz.vn/BPSTEST/AuthenticateService.asmx?WSDL', function (err, client) {
    if (err) console.error(err);
    else {
        const auth = new soap.BasicAuthSecurity('000028', 'thanung');
        client.addSoapHeader({});
        client.setSecurity(auth);
        client.Login({header: args}, function (err, response, rawResponse, soapHeader, rawRequest) {
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