import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () =>
                import ('@/views/dashboard/index'),
            meta: { title: 'Dashboard', icon: 'dashboard' }
        }]
    },

    {
        path: '/example',
        component: Layout,
        redirect: '/example/table',
        name: 'Example',
        meta: { title: 'Example', icon: 'el-icon-s-help' },
        children: [{
                path: 'table',
                name: 'Table',
                component: () =>
                    import ('@/views/table/index'),
                meta: { title: 'Table', icon: 'table' }
            },
            {
                path: 'tree',
                name: 'Tree',
                component: () =>
                    import ('@/views/tree/index'),
                meta: { title: 'Tree', icon: 'tree' }
            }
        ]
    },

    {
        path: '/form',
        component: Layout,
        children: [{
            path: 'index',
            name: 'Form',
            component: () =>
                import ('@/views/form/index'),
            meta: { title: 'Form', icon: 'form' }
        }]
    }, {
        path: '/users',
        component: Layout,
        redirect: '/users/info',
        hidden: true,
        children: [{
            path: 'info',
            name: 'users.index',
            component: () =>
                import ('@/views/users/index'),
            meta: { title: '个人用户信息修改', icon: 'user' }

        }]
    }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [{
        path: '/permission',
        component: Layout,
        redirect: '/permission/index',
        name: 'permission',
        meta: {
            title: '权限管理',
            icon: 'el-icon-s-custom',
            roles: ['admin']
        },
        children: [{
            path: 'index',
            name: 'permission.index',
            component: () =>
                import ('@/views/permission/permission'),
            meta: {
                title: '权限',
                icon: '',
                roles: ['admin'],
                noCache: true,
            }
        }, {
            path: 'roles',
            name: 'permission.roles',
            component: () =>
                import ('@/views/permission/roles'),
            meta: {
                title: '角色管理',
                icon: '',
                roles: ['admin'],
                noCache: true,

            }
        }, {
            path: 'users',
            name: 'permissions.users',

            component: () =>
                import ('@/views/permission/users/index'),
            meta: {
                title: '用户管理',
                icon: '',
                roles: ['admin'],
                noCache: true
            },
            children: [{
                hidden: true,
                path: 'assign-roles/:id',
                name: 'permissions.users.assign-roles',
                props: true,
                component: () =>
                    import ('@/views/permission/users/assign-roles'),
                meta: {
                    title: '用户添加角色',
                    roles: ['admin'],
                }
            }, {
                hidden: true,
                path: 'assign-domains/:id',
                name: 'permissions.users.assgign-domains',
                props: true,
                component: () =>
                    import ('@/views/permission/users/assign-domains'),
                meta: {
                    tile: '给用户分配域名',
                    roles: ['admin'],
                }
            }]
        }]
    }, {
        path: '/databases',
        name: 'databases',
        component: Layout,
        meta: {
            title: '数据库管理',
            icon: 'database',
            roles: ['admin'],
        },
        redirect: 'index',
        children: [{
            path: 'index',
            name: 'databases.index',
            component: () =>
                import ('@/views/databases/index'),
            meta: {
                title: '数据库',
                roles: ['admin'],
                icon: 'database',
            },

        }, {
            path: 'action',
            name: 'databases.action',
            component: () =>
                import ('@/views/router-bridge/bridge.vue'),
            meta: {
                noCache: true,
                title: '数据库',
                roles: ['admin'],
                icon: 'database',

            },
            children: [{
                path: 'create',
                name: 'database.action.create',
                component: () =>
                    import ('@/views/databases/create'),
                meta: {
                    noCache: true,
                    title: '数据库添加',
                    roles: ['admin'],
                    icon: 'database',
                }
            }]
        }, {
            path: 'tables',
            name: 'databases.tables',
            component: () =>
                import ('@/views/databases/tables'),
            meta: {
                title: '表管理',
                icon: 'table',
                roles: ['admin'],

            }
        }]
    }, {
        path: '/orders',
        name: 'orders',
        component: Layout,
        redirect: 'index',
        children: [{
            path: 'index',
            name: 'orders.index',
            component: () =>
                import ('@/views/orders/index'),
            meta: {
                title: '订单管理',
                icon: 'order',
                roles: ['admin']
            }
        }]
    }, {
        path: '/domains',
        name: 'domains',
        component: Layout,
        redirect: 'index',
        children: [{
            path: 'index',
            name: 'domains.index',
            component: () =>
                import ('@/views/domains/index'),
            meta: {
                title: '域名管理',
                icon: 'web',

                roles: ['admins', 'visitor', 'operation']
            }
        }]
    },

    {
        path: 'external-link',
        component: Layout,
        children: [{
            path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
            meta: { title: 'External Link', icon: 'link' }
        }]
    },

    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router