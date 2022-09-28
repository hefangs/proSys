// 品牌管理模块

import request from '@/utils/request'

// 获取品牌列表接口
// GET /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) =>
  request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' })

// 新增BaseTrademark
// POST /admin/product/baseTrademark/save
// 修改BaseTrademark
// PUT /admin/product/baseTrademark/update
// 判断带不带参数id：带就是修改，不带就是新增
export const reqAddOrUpdateTradeMark = tradeMark => {
  if (tradeMark.id) {
    return request({ url: `/admin/product/baseTrademark/update`, method: 'put', data: tradeMark })
  } else {
    return request({ url: `/admin/product/baseTrademark/save`, method: 'post', data: tradeMark })
  }
}

// 删除BaseTrademark
// DELETE /admin/product/baseTrademark/remove/{ id }
export const removeTradeMark = id =>
  request({ url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete' })
