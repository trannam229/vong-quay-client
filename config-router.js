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
            path: '/',
            name: 'Tài khoản',
            routes: [
                {
                    path: '/account/logout',
                    name: 'Đăng xuất',
                },

            ],
        },
    ],
}