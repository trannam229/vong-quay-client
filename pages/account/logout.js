import MainLayout from '@/layouts/main';
import { PageHeader, Card, Button } from 'antd';

export default function Example() {
  return (
    <MainLayout>
      <PageHeader className="site-page-header"
        title="Đăng xuất"
        style={{ paddingLeft: 0 }}
      />
      <Card style={{ width: 300, textAlign: "center" }}>
        <img src="/medal.svg" alt="Vercel Logo" className="logo" width="100px" />
        <p>Bạn có thực sự muốn Đăng xuất?</p>
        <Button type="primary" shape="round" style={{ width: 100 }}>Có</Button>
        <Button shape="round" style={{ width: 100 }}>Không</Button>
      </Card>
    </MainLayout>
  )
}
