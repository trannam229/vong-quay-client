import { Card, Form, Input, Button, Image, notification } from 'antd';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';

function login() {
  const route = useRouter();
  const logout = () => {
    Cookies.remove('access-token')
    route.push('/')
  };

  const style = {
    button: {
      width: 150,
      height: 40,
      fontSize: 16
    },
    txt: {
      fontSize: 18,
      color: '#fff'
    },
    header: {
      textAlign: 'center',
      marginTop: '12px'
    },
    card: {
      width: 600,
      textAlign: 'center',
      margin: '0 auto'
    }
  }

  return (
    <Card style={{ width: '70%', margin: 'auto', textAlign: 'center', border: 'none' }}>
      <Image preview={false} src="/logout.svg" className="mt-3" width={100} />
      <p style={style.txt} className="mt-2">Xác nhận đăng xuất</p>
      <Button
        type="primary"
        shape="round"
        style={style.button}
        onClick={logout}>OK</Button>
    </Card>
  );
}

export default login;
