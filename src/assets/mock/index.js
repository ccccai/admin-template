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
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/api/login', 'post', loginData)
Mock.mock('/api/company/manage', 'post', memberData)
