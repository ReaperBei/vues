import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    },{
      path: 'myCenter',
      name: 'myCenter',
      component: () => import('@/views/myCenter/index'),
      meta: {title: '个人中心'},
      hidden: true}]
  }
]

export const asyncRouterMap = [
  {
    path:'/sms',
    component: Layout,
    redirect: '/sms/coupon',
    name: 'sms',
    meta: {title: '营销中心', icon: 'sms'},
    children: [
      {
        path: 'flash',
        name: 'flash',
        component: () => import('@/views/sms/flash/index'),
        meta: {title: '秒杀活动列表', icon: 'sms-flash'}
      },
      {
        path: 'flashSession',
        name: 'flashSession',
        component: () => import('@/views/sms/flash/sessionList'),
        meta: {title: '秒杀时间段列表'},
        hidden:true
      },
      {
        path: 'selectSession',
        name: 'selectSession',
        component: () => import('@/views/sms/flash/selectSessionList'),
        meta: {title: '秒杀时间段选择'},
        hidden:true
      },
      {
        path: 'flashProductRelation',
        name: 'flashProductRelation',
        component: () => import('@/views/sms/flash/productRelationList'),
        meta: {title: '秒杀商品列表'},
        hidden:true
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('@/views/sms/coupon/index'),
        meta: {title: '优惠券列表', icon: 'sms-coupon'}
      },
      {
        path: 'addCoupon',
        name: 'addCoupon',
        component: () => import('@/views/sms/coupon/add'),
        meta: {title: '添加优惠券'},
        hidden:true
      },
      {
        path: 'updateCoupon',
        name: 'updateCoupon',
        component: () => import('@/views/sms/coupon/update'),
        meta: {title: '修改优惠券'},
        hidden:true
      },
      {
        path: 'couponHistory',
        name: 'couponHistory',
        component: () => import('@/views/sms/coupon/history'),
        meta: {title: '优惠券领取详情'},
        hidden:true
      },
      {
        path: 'brand',
        name: 'homeBrand',
        component: () => import('@/views/sms/brand/index'),
        meta: {title: '品牌推荐', icon: 'product-brand'}
      },
      {
        path: 'new',
        name: 'homeNew',
        component: () => import('@/views/sms/new/index'),
        meta: {title: '新品推荐', icon: 'sms-new'}
      },
      {
        path: 'hot',
        name: 'homeHot',
        component: () => import('@/views/sms/hot/index'),
        meta: {title: '人气推荐', icon: 'sms-hot'}
      },
      {
        path: 'subject',
        name: 'homeSubject',
        component: () => import('@/views/sms/subject/index'),
        meta: {title: '专题推荐', icon: 'sms-subject'}
      },
      {
        path: 'advertise',
        name: 'homeAdvertise',
        component: () => import('@/views/sms/advertise/index'),
        meta: {title: '广告列表', icon: 'sms-ad'}
      },
      {
        path: 'addAdvertise',
        name: 'addHomeAdvertise',
        component: () => import('@/views/sms/advertise/add'),
        meta: {title: '添加广告'},
        hidden:true
      },
      {
        path: 'updateAdvertise',
        name: 'updateHomeAdvertise',
        component: () => import('@/views/sms/advertise/update'),
        meta: {title: '编辑广告'},
        hidden:true
      }
    ]
  },
  {
    path:'/ums',
    component: Layout,
    redirect: '/ums/admin',
    name: 'ums',
    meta: {title: '系统管理', icon: 'ums'},
    children: [
      {
        path: 'admin',
        name: 'admin',
        component: () => import('@/views/ums/admin/index'),
        meta: {title: '用户管理', icon: 'ums-admin'}
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/views/ums/role/index'),
        meta: {title: '角色管理', icon: 'ums-role'}
      },
      {
        path: 'allocMenu',
        name: 'allocMenu',
        component: () => import('@/views/ums/role/allocMenu'),
        meta: {title: '分配菜单'},
        hidden: true
      },
      {
        path: 'allocResource',
        name: 'allocResource',
        component: () => import('@/views/ums/role/allocResource'),
        meta: {title: '分配资源'},
        hidden: true
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/views/ums/menu/index'),
        meta: {title: '菜单管理', icon: 'ums-menu'}
      },
      {
        path: 'addMenu',
        name: 'addMenu',
        component: () => import('@/views/ums/menu/add'),
        meta: {title: '添加菜单'},
        hidden: true
      },
      {
        path: 'updateMenu',
        name: 'updateMenu',
        component: () => import('@/views/ums/menu/update'),
        meta: {title: '修改菜单'},
        hidden: true
      },
      {
        path: 'resource',
        name: 'resource',
        component: () => import('@/views/ums/resource/index'),
        meta: {title: '资源管理', icon: 'ums-resource'}
      },
      {
        path: 'resourceCategory',
        name: 'resourceCategory',
        component: () => import('@/views/ums/resource/categoryList'),
        meta: {title: '资源分类'},
        hidden: true
      },
      {
        path: 'dictionaries',
        name: 'dictionaries',
        component: () => import('@/views/ums/dictionaries/index'),
        meta: {title: '字典管理', icon: 'ums-dictionaries'}
      },
      {
        path: 'area',
        name: 'area',
        component: () => import('@/views/ums/area/index'),
        meta: {title: '区域管理', icon: 'ums-area'}
      },
      {
        path: 'dctionmenu',
        name: 'dctionmenu',
        component: () => import('@/views/ums/dictionaries/dctionmenu'),
        meta: {title: '数据管理'},
        hidden: true
      },
      {
        path: 'parameter',
        name: 'parameter',
        component: () => import('@/views/ums/parameter/index'),
        meta: {title: '参数管理', icon: 'order-setting'},
      },
      {
        path: 'parameterMessage',
        name: 'parameterMessage',
        component: () => import('@/views/ums/parameter/message'),
        meta: {title: '查询参数信息'},
        hidden:true
      },
      {
        path: 'news',
        name: 'news',
        component: () => import('@/views/ums/news'),
        meta: {title: '消息管理', icon: 'ums-news'} 
      },
      {
        path: 'newsDetails',
        name: 'newsDetails',
        component: () => import('@/views/ums/news/newsDetails'),
        meta: {title: '消息详情', icon: 'ums-news'},
        hidden:true
      },
      {
        path: 'showInfo',
        name: 'showInfo',
        component: () => import('@/views/ums/showInfo'),
        meta: {title: '展示信息', icon: 'ums-showInfo'},
      },
      {
        path: 'versions',
        name: 'versions',
        component: () => import('@/views/ums/versions'),
        meta: {title: '版本管理', icon: 'ums-versions'},
      },
    ]
  },
  {
    path:'/cms',
    component: Layout,
    redirect: '/cms/base',
    name: 'cms',
    meta: {title: '客户管理', icon: 'cms'},
    children: [
      {
        path: 'base',
        name: 'base',
        component: () => import('@/views/cms/base/index'),
        meta: {title: '基地管理', icon: 'cms-base'}
      },
      {
        path: 'baseMessage',
        name: 'baseMessage',
        component: () => import('@/views/cms/base/basemessage'),
        meta: {title: '查询基地信息'},
        hidden: true
      },
      {
        path: 'shop',
        name: 'shop',
        component: () => import('@/views/cms/shop/index'),
        meta: {title: '门店管理', icon: 'cms-shop'}
      },
      {
        path: 'shopMessage',
        name: 'shopMessage',
        component: () => import('@/views/cms/shop/message'),
        meta: {title: '查询门店信息'},
        hidden: true
      },
      {
        path: 'redactShop',
        name: 'redactShop',
        component: () => import('@/views/cms/shop/update'),
        meta: {title: '编辑门店'},
        hidden:true
      },
      {
        path: 'accountDetails',
        name: 'accountDetails',
        component: () => import('@/views/cms/shop/accountDetails'),
        meta: {title: '门店账户明细'},
        hidden:true
      },
      {
        path: 'integralDetail',
        name: 'integralDetail',
        component: () => import('@/views/cms/shop/integralDetail'),
        meta: {title: '积分明细'},
        hidden:true
      },
      {
        path: 'shopOrder',
        name: 'shopOrder',
        component: () => import('@/views/cms/shop/shopOrder'),
        meta: {title: '订单列表'},
        hidden:true
      },
      {
        path: 'orderDetails',
        name: 'orderDetails',
        component: () => import('@/views/cms/shop/orderDetails'),
        meta: {title: '订单详情'},
        hidden:true
      },
      {
        path: 'member',
        name: 'member',
        component: () => import('@/views/cms/member/index'),
        meta: {title: '会员管理', icon: 'cms-member'},
      },
      {
        path: 'memberMessage',
        name: 'memberMessage',
        component: () => import('@/views/cms/member/memberMessage'),
        meta: {title: '查询会员信息'},
        hidden:true
      },
      {
        path: 'discounts',
        name: 'discounts',
        component: () => import('@/views/cms/member/discounts'),
        meta: {title: '查询会员优惠'},
        hidden:true
      },
      {
        path: 'memberIntegral',
        name: 'memberIntegral',
        component: () => import('@/views/cms/member/integral'),
        meta: {title: '查询会员积分和交易详情'},
        hidden:true
      },
      {
        path: 'operate',
        name: 'operate',
        component: () => import('@/views/cms/operate/index'),
        meta: {title: '运营中心', icon: 'cms-operate'},
      },
      {
        path: 'operator',
        name: 'operator',
        component: () => import('@/views/cms/operator/index'),
        meta: {title: '运营者', icon: 'cms-operator'},
      },
      {
        path: 'account',
        name: 'account',
        component: () => import('@/views/cms/operator/account'),
        meta: {title: '账户明细'},
        hidden:true
      },
      {
        path: 'operatorIntegral',
        name: 'operatorIntegral',
        component: () => import('@/views/cms/operator/operatorIntegral'),
        meta: {title: '积分明细'},
        hidden:true
      },
      {
        path: 'copies',
        name: 'copies',
        component: () => import('@/views/cms/operator/copies'),
        meta: {title: '份数记录'},
        hidden:true
      },
      {
        path: 'ratio',
        name: 'ratio',
        component: () => import('@/views/cms/ratio/index'),
        meta: {title: '收益比例', icon: 'cms-ratio'},
      },
      {
        path: 'students',
        name: 'students',
        component: () => import('@/views/cms/students/index'),
        meta: {title: '大学生', icon: 'cms-students'},
      },
      {
        path: 'studentsAccount',
        name: 'studentsAccount',
        component: () => import('@/views/cms/students/account'),
        meta: {title: '大学生账户明细'},
        hidden:true
      },
      {
        path: 'studentsintegral',
        name: 'studentsintegral',
        component: () => import('@/views/cms/students/integral'),
        meta: {title: '大学生积分明细'},
        hidden:true
      },
    ]
  },
  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/product',
    name: 'pms',
    meta: {title: '商品中心', icon: 'product'},
    children: [{
      path: 'product',
      name: 'product',
      component: () => import('@/views/pms/product/index'),
      meta: {title: '商品列表', icon: 'product-list'}
    },
      {
        path: 'addProduct',
        name: 'addProduct',
        component: () => import('@/views/pms/product/add'),
        meta: {title: '添加商品', icon: 'product-add'}
      },
      {
        path: 'modify',
        name: 'modify',
        component: () => import('@/views/pms/product/modify'),
        meta: {title: '修改记录'},
        hidden: true
      },
      {
        path: 'upDown',
        name: 'upDown',
        component: () => import('@/views/pms/product/upDown'),
        meta: {title: '上下架记录'},
        hidden: true
      },
      {
        path: 'storeModify',
        name: 'storeModify',
        component: () => import('@/views/pms/product/storeModify'),
        meta: {title: '库存修改记录'},
        hidden: true
      },
      {
        path: 'viewProduct',
        name: 'viewProduct',
        component: () => import('@/views/pms/product/details'),
        meta: {title: '查看商品'},
        hidden: true
      },
      {
        path: 'updateProduct',
        name: 'updateProduct',
        component: () => import('@/views/pms/product/update'),
        meta: {title: '修改商品', icon: 'product-add'},
        hidden: true
      },
      {
        path: 'productCate',
        name: 'productCate',
        component: () => import('@/views/pms/productCate/index'),
        meta: {title: '商品分类', icon: 'product-cate'}
      },
      {
        path: 'addProductCate',
        name: 'addProductCate',
        component: () => import('@/views/pms/productCate/add'),
        meta: {title: '添加商品分类'},
        hidden: true
      },
      {
        path: 'updateProductCate',
        name: 'updateProductCate',
        component: () => import('@/views/pms/productCate/update'),
        meta: {title: '修改商品分类'},
        hidden: true
      },
      {
        path: 'productAttr',
        name: 'productAttr',
        component: () => import('@/views/pms/productAttr/index'),
        meta: {title: '商品类型', icon: 'product-attr'}
      },
      {
        path: 'productAttrList',
        name: 'productAttrList',
        component: () => import('@/views/pms/productAttr/productAttrList'),
        meta: {title: '商品属性列表'},
        hidden: true
      },
      {
        path: 'addProductAttr',
        name: 'addProductAttr',
        component: () => import('@/views/pms/productAttr/addProductAttr'),
        meta: {title: '添加商品属性'},
        hidden: true
      },
      {
        path: 'updateProductAttr',
        name: 'updateProductAttr',
        component: () => import('@/views/pms/productAttr/updateProductAttr'),
        meta: {title: '修改商品属性'},
        hidden: true
      },
      {
        path: 'brand',
        name: 'brand',
        component: () => import('@/views/pms/brand/index'),
        meta: {title: '品牌管理', icon: 'product-brand'}
      },
      {
        path: 'addBrand',
        name: 'addBrand',
        component: () => import('@/views/pms/brand/add'),
        meta: {title: '添加品牌'},
        hidden: true
      },
      {
        path: 'updateBrand',
        name: 'updateBrand',
        component: () => import('@/views/pms/brand/update'),
        meta: {title: '编辑品牌'},
        hidden: true
      },
      {
        path: 'inventory',
        name: 'inventory',
        component: () => import('@/views/pms/inventory/index'),
        meta: {title: '库存管理', icon:'product-inventory'}
      },
      {
        path: 'inventoryLook',
        name: 'inventoryLook',
        component: () => import('@/views/pms/inventory/inventorylook'),
        meta: {title: '查询库存信息'},
        hidden:true,
      },
      {
        path: 'lookrunning',
        name: 'lookrunning',
        component: () => import('@/views/pms/inventory/lookrunning'),
        meta: {title: '库存流水详情'},
        hidden:true,
      },
      {
        path: 'addprice',
        name: 'addprice',
        component: () => import('@/views/pms/inventory/addprice'),
        meta: {title: '申请库存列表'},
        hidden:true,
      },
      {
        path: 'prodcontrol',
        name: 'prodcontrol',
        component: () => import('@/views/pms/prodcontrol/index'),
        meta: {title: '价格管理', icon:'product-prodcontrol'}
      },
      {
        path: 'lookprice',
        name: 'lookprice',
        component: () => import('@/views/pms/prodcontrol/lookprice'),
        meta: {title: '查询商品价格'},
        hidden:true,
      },
      {
        path: 'controllook',
        name: 'controllook',
        component: () => import('@/views/pms/prodcontrol/controllook'),
        meta: {title: '价格详情'},
        hidden:true,
      },
      {
        path: 'priceRecord',
        name: 'priceRecord',
        component: () => import('@/views/pms/prodcontrol/priceRecord'),
        meta: {title: '价格记录列表'},
        hidden:true,
      },
      {
        path: 'appraise',
        name: 'appraise',
        component: () => import('@/views/pms/appraise'),
        meta: {title: '价格管理', icon:'product-appraise'}
      },
      {
        path: 'appraiseMessage',
        name: 'appraiseMessage',
        component: () => import('@/views/pms/appraise/message'),
        meta: {title: '评价管理详情'},
        hidden:true,
      },
    ]
  },
  {
    path: '/oms',
    component: Layout,
    redirect: '/oms/order',
    name: 'oms',
    meta: {title: '订单管理', icon: 'order'},
    children: [
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/oms/order/index'),
        meta: {title: '订单列表', icon: 'product-list'}
      },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        component: () => import('@/views/oms/order/orderDetail'),
        meta: {title: '订单详情'},
        hidden:true
      },
      {
        path: 'deliverOrderList',
        name: 'deliverOrderList',
        component: () => import('@/views/oms/order/deliverOrderList'),
        meta: {title: '发货列表'},
        hidden:true
      },
      {
        path: 'orderSetting',
        name: 'orderSetting',
        component: () => import('@/views/oms/order/setting'),
        meta: {title: '订单设置', icon: 'order-setting'}
      },
      {
        path: 'returnApply',
        name: 'returnApply',
        component: () => import('@/views/oms/apply/index'),
        meta: {title: '退货申请处理', icon: 'order-return'}
      },
      {
        path: 'returnReason',
        name: 'returnReason',
        component: () => import('@/views/oms/apply/reason'),
        meta: {title: '退货原因设置', icon: 'order-return-reason'}
      },
      {
        path: 'returnApplyDetail',
        name: 'returnApplyDetail',
        component: () => import('@/views/oms/apply/applyDetail'),
        meta: {title: '退货原因详情'},
        hidden:true
      }
    ]
  },
  {
    path: '/scs',
    component: Layout,
    redirect: '/scs/stock',
    name: 'scs',
    meta: {title: '股权管理', icon: 'stock'},
    children: [{
      path: 'stock',
      name: 'stock',
      component: () => import('@/views/scs/stock/index'),
      meta: {title: '股权发行', icon: 'scs-stock'}
    },
    {
      path: 'memberEquity',
      name: 'memberEquity',
      component: () => import('@/views/scs/memberEquity/index'),
      meta: {title: '会员股权分红', icon: 'scs-memberEquity'}
    },
    {
      path: 'systemEquity',
      name: 'systemEquity',
      component: () => import('@/views/scs/systemEquity/index'),
      meta: {title: '系统分红历史', icon: 'scs-systemEquity'}
    },
    {
      path: 'stockLadder',
      name: 'stockLadder',
      component: () => import('@/views/scs/stockLadder/index'),
      meta: {title: '股权增值过程', icon: 'scs-stockLadder'}
    },
    {
      path: 'applicationRecord',
      name: 'applicationRecord',
      component: () => import('@/views/scs/applicationRecord/index'),
      meta: {title: '兑换申请记录', icon: 'scs-applicationRecord'}
    },
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

