/* mock配置文件
  ps：mock模块会影响原生的ajax请求，使得服务器返回的blob类型变成乱码，
  所以如果在代码中有使用blob时，需要在mainjs中把mock注释掉，才能正常使用
*/
// 引入mockjs
import Mock from 'mockjs'
// 获取 mock.Random 对象
const Random = Mock.Random
// mock一组数据
const loginData = () => {
  const data = {
    token: Random.string(10)
  };
  return {
    data: data,
    resultCode: 1,
    resultMessage: 'success'
  }
}

const memberData = () => {
  const data = []
  const length = Random.integer(1,10)
  for (let i = 0;i < length; i++) {
    data[i] = {
      id: Random.id(),
      name: Random.cname(),
      sex: Random.cword('男女'),
      phone: `1${Random.integer(1000000000, 9999999999)}`,
      group: Random.pick(['管理者', '数据分析者', '普通成员'])
    }
  }
  return {
    data: data,
    resultCode: 1,
    resultMessage: 'success'
  }
}
const permissionList = () => {
  const data = [{
      id: 2,
      name: '公司设置',
      path: null,
      children: [{
          id: 3,
          name: '公司信息',
          path: '/companyInfo',
          children: []
        },
        {
          id: 4,
          name: '成员管理',
          path: '/memberManage',
          children: []
        },
        {
          id: 5,
          name: '权限管理',
          path: '/authManage',
          children: []
        },
        {
          id: 7,
          name: '修改员工信息',
          path: '/editMemberInfo',
          children: []
        }
      ]
    },
    {
      id: 7,
      name: '商品管理',
      path: null,
      children: [{
          id: 8,
          name: '商品管理',
          path: '/goodsManage',
          children: []
        },
        {
          id: 9,
          name: '类别管理',
          path: '/categoryManage',
          children: []
        },
        {
          id: 10,
          name: '规格管理',
          path: '/specificationManage',
          children: []
        },
        {
          id: 11,
          name: '查看商品',
          path: '/goodsInfo',
          children: []
        },
        {
          id: 12,
          name: '添加商品',
          path: '/addGoods',
          children: []
        },
        {
          id: 13,
          name: '添加规格',
          path: '/addSpecification',
          children: []
        }
      ]
    },
    {
      id: 12,
      name: '订单管理',
      path: null,
      children: [{
          id: 13,
          name: '外卖',
          path: '/takeOut',
          children: []
        },
        {
          id: 14,
          name: '自提',
          path: '/selfLift',
          children: []
        },
        {
          id: 15,
          name: '设置',
          path: '/orderSetting',
          children: []
        },
        {
          id: 16,
          name: '订单详情',
          path: '/orderDetail',
          children: []
        }
      ]
    }
  ]
  return {
    data: data,
    code: 0,
    msg: '成功'
  }
}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/api/login', 'post', loginData)
Mock.mock('/api/company/manage', 'post', memberData)
Mock.mock('/api/getPermissionList', 'post', permissionList)
