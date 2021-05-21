import Link from 'next/link';
import { Image } from 'antd';
import Cookies from 'js-cookie';
// import navStyles from '../styles/Nav.module.css';

export default function Nav() {
  const accessToken = Cookies.get('access-token');
  return (
    <nav className="nav row">
      <div className="col-md-12">
        <div className="logo">
          <a href="/">
            <Image preview={false} height={100} src="/logo.png"></Image>
          </a>
        </div>

        <div className="menu">
          <ul>
            <li>
              <Link href="/">TRANG CHỦ</Link>
            </li>
            <li>
              <Link href="/rotation">SỰ KIỆN</Link>
            </li>
            <li>
              <Link href="/card">NẠP THẺ</Link>
            </li>
            <li>
              <Link href="/diamond">RÚT KIM CƯƠNG</Link>
            </li>
            <li>
              {accessToken
                ? <Link href="/account/information">CÁ NHÂN</Link>
                : <Link href="/login">ĐĂNG NHẬP</Link>
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
