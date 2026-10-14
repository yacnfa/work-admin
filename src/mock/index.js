import Mock from 'mockjs'

let users = [
  { id: 1, username: '张三', phone: '13800138000', role: 'admin' },
  { id: 2, username: '李四', phone: '13900139000', role: 'user' }
]
let nextId = 3

function readBody(options) {
  try {
    return JSON.parse(options.body || '{}')
  } catch {
    return {}
  }
}

Mock.mock(/\/api\/user\/list(?:\?.*)?$/, 'get', options => {
  const url = new URL(options.url, window.location.origin)
  const keyword = (url.searchParams.get('keyword') || '').trim()
  return {
    code: 200,
    data: users.filter(user => user.username.includes(keyword)).map(user => ({ ...user }))
  }
})

Mock.mock('/api/user/add', 'post', options => {
  const body = readBody(options)
  if (!body.username || !body.username.trim()) {
    return { code: 400, msg: '用户名不能为空' }
  }
  users.push({
    id: nextId++,
    username: body.username.trim(),
    phone: body.phone || '',
    role: body.role || 'user'
  })
  return { code: 200, msg: '新增成功' }
})

Mock.mock('/api/user/edit', 'post', options => {
  const body = readBody(options)
  const index = users.findIndex(user => user.id === Number(body.id))
  if (index === -1) return { code: 404, msg: '用户不存在' }
  users[index] = { ...users[index], ...body, id: users[index].id }
  return { code: 200, msg: '编辑成功' }
})

Mock.mock('/api/user/delete', 'post', options => {
  const { id } = readBody(options)
  const before = users.length
  users = users.filter(user => user.id !== Number(id))
  return before === users.length
    ? { code: 404, msg: '用户不存在' }
    : { code: 200, msg: '删除成功' }
})
