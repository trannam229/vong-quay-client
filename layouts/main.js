import dynamic from 'next/dynamic'
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/style.less';

import RouterConfigs from  "../config-router";

const ProLayout = dynamic(() => import('@ant-design/pro-layout'), {
  ssr: true,
})


const menuHeaderRender = (logoDom, titleDom, props) => (
  <Link href="/">
    <a>
      {logoDom}
      {/* {!props?.collapsed && titleDom} */}
    </a>
  </Link>
)

const menuItemRender = (options, element) => (
  <Link href={options.path}>
    <a>{element}</a>
  </Link>
)

export default function Main({ children }) {
  return (
    <ProLayout
      style={{ minHeight: '100vh' }}
      route={RouterConfigs}
      menuItemRender={menuItemRender}
      menuHeaderRender={menuHeaderRender}
      onCollapse={false}
    >
      {children}
    </ProLayout>
  )
}
