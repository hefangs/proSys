import request from '@/utils/request'
// 获取图片数据
// GET /admin/product/spuImageList/{spuId}
export const reqSpuImageList = spuId =>
  request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })

// 获取销售属性数据
// GET /admin/product/spuSaleAttrList/{spuId}
export const reqSpuSaleAttrList = spuId =>
  request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'get' })

// 获取平台属性数据
// GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrInfoList = (category1Id, category2Id, category3Id) =>
  request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: 'get'
  })
// 获取sku列表
//   GET /admin/product/list/{page}/{limit}
export const reqSkuList = (page, limit) =>
  request({ url: `/admin/product/list/${page}/${limit}`, method: 'get' })

// 上架
// GET /admin/product/onSale/{skuId}
export const reqSale = skuId => request({ url: `/admin/product/onSale/${skuId}`, method: 'get' })
// 下架
// GET /admin/product/cancelSale/{skuId}
export const reqCancelSale = skuId =>
  request({ url: `/admin/product/cancelSale/${skuId}`, method: 'get' })

// 获取sku详情
// GET /admin/product/getSkuById/{skuId}
export const reqSkuById = skuId =>
  request({ url: `/admin/product/getSkuById/${skuId}`, method: 'get' })
