import Mock from 'mockjs'

Mock.setup({
  timeout: 500    //请求响应延时
})

/* 
 * 处理登陆相关请求
 */
const USER_MAP = {
  super_admin: {
    username: 'super_admin',
    password: '123456',
    user_id: '1',
    role: ['super_admin', 'admin'],
    token: '9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b',
    avatar: ''
  },
  admin: {
    username: 'admin',
    password: '123456',
    user_id: '2',
    role: ['admin'],
    token: '8888b09199c62bcf9418ad846dd0e4bbdfc6ee4b',
    avatar: ''
  },
  lirenjie: {
    username: 'lirenjie',
    password: '123456',
    user_id: '2',
    role: ['user'],
    token: '8833b09199c62bcf9418ad846dd0e4bbdfc6ee4b',
    avatar: ''
  }
}

//登陆验证
Mock.mock('/api/user/login', req => {
  let req_body = JSON.parse(req.body)
  //console.log('Mock.js 拦截登陆请求：',req_body)
  if ( req_body.username && USER_MAP[req_body.username] && req_body.password == USER_MAP[req_body.username].password) {
    return {
      code: 0,
      msg: 'OK',
      //data: USER_MAP[req_body.username],
      token: USER_MAP[req_body.username].token
    }
  }
  else {
    return {
      code: -1,
      msg: 'Login failed!',
    }
  }
})

//获取用户信息
Mock.mock('/api/user/info', req => {
  let req_body = JSON.parse(req.body)
  let userInfo = {}
  for (let username of Object.keys(USER_MAP)) {
    if (USER_MAP[username].token && (USER_MAP[username].token === req_body.token)) {
      userInfo = USER_MAP[username]
    }
  }
  return {
    code: 0,
    msg: 'OK',
    data: userInfo
  }
})

//退出登陆
Mock.mock('/api/user/logout',req => {
  return {
    code: 0,
    msg: 'Logout success!'
  }
})

/* 
 * 处理用户列表操作
 */

//获取用户列表
Mock.mock('/api/users', 'get' ,req => {
  let userList = []
  for (let i=0; i<=110; i++) {
    let user = Mock.mock({
      id: Mock.mock('@id'),
      name: Mock.mock('@cname'),
      email: Mock.mock('@email()'),
      "group|1": ["管理员","普通用户"],
      "title|1": ["运维工程师","开发工程师","测试工程师"],
      //"status|1": ["active","inactive"],
      "active":Mock.mock('@boolean'),
      create_date: Mock.mock('@date("yyyy-MM-dd")')
    })
    userList.push(user)
  }
  return {
    code: 0,
    msg: "OK",
    data: userList
  }
})

//新增用户
Mock.mock(/\/api\/user$/, 'post' , req => {
  let req_body = JSON.parse(req.body)
  console.log('Mock.js 拦截新增用户请求：', req.url, req_body)
  return {
    code: 0,
    msg: 'success!'
  }
})

//更新用户信息
Mock.mock(/\/api\/user\/\d*$/, 'post' , req => {
  let req_body = JSON.parse(req.body)
  console.log('Mock.js 拦截更新用户请求：', req.url, req_body)
  return {
    code: 0,
    msg: 'success!'
  }
})

//删除一个用户
Mock.mock(/\/api\/user\/\d*/, 'delete' , req => {
  console.log('Mock.js 拦截删除用户请求：', req.url)
  return {
    code: 0,
    msg: 'success!'
  }
})

//批量删除用户
Mock.mock('/api/user/batch-delete', 'post' , req => {
  let req_body = JSON.parse(req.body)
  console.log('Mock.js 拦截批量删除用户请求：', req_body)
  return {
    code: 0,
    msg: 'success!'
  }
})
