import dynamic from 'next/dynamic'
import Link from 'next/link'
import {useRouter} from 'next/router'
import Cookies from 'js-cookie';
import RouterConfigs from "../config-router";
import {useEffect} from 'react';

const ProLayout = dynamic(() => import('@ant-design/pro-layout'), {
    ssr: false,
})


const menuHeaderRender = (logoDom, titleDom, props) => (
    <Link href="/category/dashboard" className="m-auto">
        <div className="text-center">{logoDom}</div>
    </Link>
)

const menuItemRender = (options, element) => (
    <Link href={options.path}>
        <a>{element}</a>
    </Link>
)

const headerRender = (config) => {
    const user = Cookies.get('account_name');

    return (
        <div className="d-flex hello-user justify-content-end mr-5">
            Xin chào nhà đầu tư {user}
            <img src="/vietnam.svg" className="ml-3" width="32"/>
            <img src="/united-kingdom.svg" className="ml-3" width="32"/>
        </div>
    )
}

export default function Main({children}) {
    const route = useRouter();
    useEffect(() => {
        const token = Cookies.get('access_token');
        if (!token) {
            route.push({pathname: '/login'})
            return;
        }
    }, [])

    return (
        <ProLayout
            style={{minHeight: '100vh'}}
            route={RouterConfigs}
            logo="/logo-white.png"
            menuItemRender={menuItemRender}
            menuHeaderRender={menuHeaderRender}
            title="Lendbiz"
        >
            {headerRender()}
            {children}
        </ProLayout>
    )
}
