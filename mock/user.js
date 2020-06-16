// const md5 = require('crypto-js/md5');
const login = (req, res) => {
  // 根据参数做验证
  const username = req.body.username;
  res.json({
    code: 0,
    msg: '登录成功',
    data: {
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: username,
      token: 11111111111,
      sex: 1,
      role: ['admin']
    }
  });
};
const getMenus = (req, res) => {
  // 直接返回树菜单
  res.json({
    code: 0,
    msg: '获取菜单成功',
    data: [
      { path: '/dashboard', icon: 's-data', title: '看板模块' },
      {
        path: '/permission',
        icon: 'lock',
        title: '权限模块',
        children: [
          { path: '/permission/page', title: '界面查看' },
          { path: '/permission/directive', title: '指令查看' }
        ]
      },
      {
        path: '/table',
        icon: 'date',
        title: '表格模块',
        children: [
          { path: '/table/dynamic-table', title: '表格1' }
        ]
      }
    ]
  })
}
// 退出登录
const loginOut = (req, res) => {
  // 这里不处理逻辑了（前端清除本地存储）
  res.json({
    code: 0,
    msg: '退出成功'
  });
};
const changeRole = (req, res) => {
  const roleName = req.body.roleName;
  res.json({
    code: 0,
    msg: '获取成功',
    data: {
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: roleName,
      token: 11111111111,
      sex: 1,
      role: roleName
    }
  });
}
const handSearch = (req, res) => {
  const searchTxt = req.body.searchTxt;
  res.json({
    code: 0,
    msg: '获取成功',
    data: [{
      date: '2016-05-02',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: searchTxt,
      zip: 200333
    }, {
      date: '2016-05-04',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: searchTxt,
      zip: 200333
    }, {
      date: '2016-05-01',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: searchTxt,
      zip: 200333
    }, {
      date: '2016-05-03',
      name: '王小虎',
      province: '上海',
      city: '普陀区',
      address: searchTxt,
      zip: 200333
    }]
  });
}
module.exports = [{
  'post|login': login,
  'post|getMenus': getMenus,
  'post|loginOut': loginOut,
  'post|changeRole': changeRole,
  'post|handSearch': handSearch
}];
