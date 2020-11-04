import MainLayout from '@layouts/main';
import { PageHeader, Card, Button, Image } from 'antd';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'


export default function Example() {
  const route = useRouter();

  const logout = () => {
    Cookies.remove('access_token');
    route.push({ pathname: '/example' })
  }

  return (
    <MainLayout>
      <PageHeader className="site-page-header"
        title="Đăng xuất"
        style={{ paddingLeft: 0 }}
      />
      <Card style={{ width: 300, textAlign: 'center', margin: '0 auto' }}>
        <Image src="/medal.svg" width={100} />
        <p>Bạn có thực sự muốn Đăng xuất?</p>
        <Button
          type="primary"
          shape="round"
          style={{ width: 100 }}
          onClick={logout}>Có</Button>
        <Button shape="round" style={{ width: 100 }}>Không</Button>
      </Card>
    </MainLayout>
  )
}
