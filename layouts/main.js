import dynamic from 'next/dynamic'
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/style.less';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';
import RouterConfigs from "../config-router";
import { useEffect } from 'react';
import jwt from 'jsonwebtoken'
const ProLayout = dynamic(() => import('@ant-design/pro-layout'), {
  ssr: false,
})


const menuHeaderRender = (logoDom, titleDom, props) => (
  <Link href="/" className="m-auto">
    <div className="text-center">{logoDom}</div>
  </Link>

)

const menuItemRender = (options, element) => (
  <Link href={options.path}>
    <a>{element}</a>
  </Link>
)

const headerRender = () => {
  const user = Cookies.get('account_name');

  return <div className="d-flex justify-content-end mr-5">
    Xin chào nhà đầu tư {user}
  </div>
}

export default function Main({ children }) {
  const route = useRouter();
  useEffect(() => {
    const token = Cookies.get('access_token');
    if (!token) {
      route.push({ pathname: '/login' })
      return;
    }
  }, [])

  return (
    <ProLayout
      style={{ minHeight: '100vh' }}
      route={RouterConfigs}
      logo="/logo-white.png"
      menuItemRender={menuItemRender}
      menuHeaderRender={menuHeaderRender}
      headerRender={headerRender}
    >
      {children}
    </ProLayout>
  )
}
