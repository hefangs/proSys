// 平台属性管理模块
import request from '@/utils/request'

// 获取一级分类
// GET /admin/product/getCategory1
export const reqCategory1List = () => request({ url: 'admin/product/getCategory1', method: 'get' })

// 获取二级分类
// GET /admin/product/getCategory2/{category1Id}
export const reqCategory2List = category1Id =>
  request({ url: `admin/product/getCategory2/${category1Id}`, method: 'get' })

// 获取三级分类
// GET /admin/product/getCategory3/{category2Id}
export const reqCategory3List = category2Id =>
  request({ url: `admin/product/getCategory3/${category2Id}`, method: 'get' })
