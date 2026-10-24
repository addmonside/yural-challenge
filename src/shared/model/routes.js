export const routes = Object.freeze({
  PART_BRAND_LIST: '/brands',
  PART_LIST_BY_BRAND: '/parts/:brand/:article',
  getPartListByBrand: (brand) => `/parts/${brand}`,
  ERROR: '/errors/:codeId',
})
