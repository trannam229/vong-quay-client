import { AppstoreOutlined, DollarCircleOutlined, CreditCardOutlined, UserOutlined, CheckCircleOutlined, PlayCircleOutlined, UnorderedListOutlined } from '@ant-design/icons';

export default {
  path: '/',
  routes: [
    {
      path: '/card',
      name: 'Nạp thẻ',
      icon: <DollarCircleOutlined />,
    },
    {
      path: '/rotation',
      name: 'Quay thưởng',
      icon: <CreditCardOutlined />,
    },
    {
      path: '/diamond',
      name: 'Rút kim cương',
      icon: <PlayCircleOutlined />,
    },
    {
      path: '/account',
      name: 'Thông tin cá nhân',
      icon: <UnorderedListOutlined />,
      routes: [
        {
          path: '/account/information',
          name: 'Thông tin cá nhân',
        },
        {
          path: '/account/changepassword',
          name: 'Đổi mật khẩu',
        },
        {
          path: '/account/logout',
          name: 'Đăng xuất',
        }
      ]
    },
  ],
}