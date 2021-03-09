import MainLayout from '@layouts/main';
import { PageHeader, Card, Button, Image } from 'antd';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'


export default function Example() {
  const route = useRouter();

  const logout = () => {
    Cookies.remove('access_token');
    route.push({ pathname: '/login' })
  }

  const style = {
    button: {
      width: 150,
      height: 40,
      fontSize: 16
    },
    txt: {
      fontSize: 18
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
    <MainLayout>
      <h3 style={style.header}>Đăng xuất</h3>
      <Card style={style.card} className="mt-4">
        <Image preview={false} src="/logout.svg" className="mt-3" width={100} />
        <p style={style.txt} className="mt-5">Bạn có thực sự muốn Đăng xuất?</p>
        <Button
          type="primary"
          shape="round"
          style={style.button}
          className="mr-5 mt-3 mb-3"
          onClick={logout}>Có</Button>
        <Button shape="round" style={style.button}>Không</Button>
      </Card>
    </MainLayout>
  )
}
