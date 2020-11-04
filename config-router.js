export default {
  path: '/',
  routes: [
    {
      path: '/category',
      name: 'Danh mục',
      routes: [
        {
          path: '/category/dashboard',
          name: 'Tổng quan',
        },
        {
          path: '/category/account-statement',
          name: 'Sao kê tài khoản',
        },
        {
          path: '/category/invest-category',
          name: 'Danh mục đầu tư',
        },
        {
          path: '/category/income-report',
          name: 'Báo cáo thu nhập',
        },
        {
          path: '/category/processing-category',
          name: 'Danh mục chờ khớp lệnh',
        },
      ],
    },
    {
      path: '/trade',
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

      path: '/auto',
      name: 'Đầu tư tự động',
      routes: [
        {
          path: '/auto/create/createAutoInvestRule',
          name: 'Cài đặt',
        },
        {
          path: '/auto/invests/getAutoInvests',
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
          path: '/money/payment',
          name: 'Lệnh chờ thanh toán',
        }
      ]
    },
    {
      path: '/account',
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