
export const hasRoutePermission = (routeObj, roles) => {
  //判断路由对象是否与当前用户role匹配
  if (routeObj.meta && routeObj.meta.role) {
    return roles.some( item => {
      return routeObj.meta.role.includes(item)
    })
  } else {
    return true
  }
}

const hasPermission = (routeItem, roles) => {
  //判断meta.role是否与当前用户role匹配
  if ( roles.includes('super_admin') ) {
    return true    //超级管理员有所有菜单权限
  }
  if (routeItem.meta && routeItem.meta.role) {
    return roles.some( item => {
      return routeItem.meta.role.includes(item)
    })
  } else {
    return true
  }
}

export const getMenuListByRoutes = (routes, roles) => {
  //根据路由生成菜单栏中的菜单项列表
  let res = []
  routes.forEach((item) => {
    // if (!item.meta || (item.meta && !item.meta.hidden)){
      if (item.meta && !item.meta.hidden) {
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        path: item.path,
        meta: item.meta,
      }
      if ((item.children && item.children.length !== 0) && hasPermission(item, roles)) {
        obj.children = getMenuListByRoutes(item.children, roles)
      }
      if (hasPermission(item, roles)) {
        res.push(obj)
      }
    }
  })
  return res
}
