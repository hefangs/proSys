import request from '@/utils/request'

// GET /admin/product/{page}/{limit}
export const reqSpuList = (page, limit, category3Id) =>
  request({
    url: `/admin/product/${page}/${limit}`,
    method: 'get',
    params: { category3Id }
  })

// 获取spu基本信息
// GET /admin/product/getSpuById/{spuId}
export const reqSpu = spuId => request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' })
// 获取品牌信息
// GET /admin/product/baseTrademark/getTrademarkList
export const reqTradeMarkList = () =>
  request({ url: `/admin/product/baseTrademark/getTrademarkList`, method: 'get' })

// 获取图片信息
// GET /admin/product/spuImageList/{spuId}
export const reqSpuImageList = spuId =>
  request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })

// 获取平台全部销售属性
// GET /admin/product/baseSaleAttrList
export const reqBaseSaleAttrList = () =>
  request({ url: `/admin/product/baseSaleAttrList`, method: 'get' })

// 添加或修改spu（有id是修改）
// /admin/product/saveSpuInfo
// /admin/product/updateSpuInfo
export const reqAddOrUpdateSpu = spuInfo => {
  if (spuInfo.id) {
    return request({ url: `/admin/product/updateSpuInfo`, method: 'post', data: spuInfo })
  } else {
    return request({ url: `/admin/product/saveSpuInfo`, method: 'post', data: spuInfo })
  }
}

// 删除spu
// DELETE  /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = spuId =>
  request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete' })

// 添加sku
// POST /admin/product/saveSkuInfo
export const reqAddSku = skuInfo =>
  request({ url: `/admin/product/saveSkuInfo`, method: 'post', data: skuInfo })

// 获取sku列表数据
// GET /admin/product/findBySpuId/{spuId}
export const reqSkuList = spuId =>
  request({ url: `/admin/product/findBySpuId/${spuId}`, method: 'get' })
