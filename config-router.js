export default {
  path: '/',
  routes: [
    {
      path: '/',
      name: 'Danh mục',
      routes: [
        {
          path: '/category/income',
          name: 'Sao kê tài khoản',
        },
        {
          path: '/welcome',
          name: 'Danh mục đầu tư',
        },

      ],
    },
    {
      path: '/',
      name: 'Giao dịch',
      routes: [
        {
          path: '/trade/invest',
          name: 'Đầu tư',
        }
      ],
    },
    {
      path: '/example',
      name: 'Example Page',
    },
    {

      path: '/',
      name: 'Đầu tư tự động',
      routes: [
        {
          path: '/auto/invests/getAutoInvests',
          name: 'Cài đặt',
        },
        {
          path: '/auto/invest-info/getAutoInvestInfo',
          name: 'Danh sách',
        }
      ],
    },
    {
      path: '/money',
      name: 'Tiền',
      routes: [
        {
          path: '/money/deposit',
          name: 'Nộp tiền',
        },
        {
          path: '/money/withdraw',
          name: 'Rút tiền',
        },

        {
          path: '/',
          name: 'Tài khoản',
          routes: [
            {
              path: '/account/logout',
              name: 'Đăng xuất',
            },

          ],
          path: '/money/payment',
          name: 'Lệnh chờ thanh toán',
        }
      ]
    },
    {
      path: '/',
      name: 'Tài khoản',
      routes: [
        {
          path: '/account/membership',
          name: 'Hạng thành viên',
        },
        {
          path: '/account/bonus',
          name: 'Tiền thưởng',
        },
        {
          path: '/account/changepassword',
          name: 'Đổi mật khẩu',
        },
        {
          path: '/account/faq',
          name: 'FAQ',
        },
        {
          path: '/account/logout',
          name: 'Đăng xuất',
        },
      ],
    },
  ],
}