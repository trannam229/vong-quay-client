import MainLayout from '@/layouts/main';
import { lAxios } from '@/layouts/axiosConfig';

export default function Example() {
  const xmlBody = `
  <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
    <Body>
        <Login xmlns="http://tempuri.org">
            <!-- Optional -->
            <header>
                <Username>000028</Username>
                <Password>thanung</Password>
                <Sessionid>[string?]</Sessionid>
                <Deviceid>[string?]</Deviceid>
            </header>
        </Login>
    </Body>
  </Envelope>`;

  lAxios.post('https://bps.lendbiz.vn/BPSTEST/AuthenticateService.asmx', xmlBody)
    .then(res => console.log(res['soap:Envelope']['soap:Body']))
    .catch(err => console.log(err))

  return <MainLayout>Example page</MainLayout>
}
