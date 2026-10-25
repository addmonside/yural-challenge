import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '@/shared/api/api'
import { endpoints } from '@/shared/model/endpoints'
import { defaultErrorMessage } from '@/shared/model/errors/messages'

const initialState = {
  list: [],
  brandNameList: [],
  status: 'idle',
  error: null,
  requestedNumber: '',
  requestedBrand: '',
  requestedHasAnalogues: false,
}

function getBrand(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function getLowestWarehousePrice(good) {
  if (!Array.isArray(good?.warehouses)) {
    return 0
  }

  const prices = good.warehouses
    .map((warehouse) => Number(warehouse?.price))
    .filter((price) => Number.isFinite(price) && price > 0)

  return prices.length > 0 ? Math.min(...prices) : 0
}

function normalizeGood(good) {
  const count = Number(good.count)

  return {
    goodsID: good.goodsID,
    brand: getBrand(good.brand),
    name: good.name,
    number: good.number,
    count: Number.isFinite(count) ? count : 0,
    price: getLowestWarehousePrice(good),
  }
}

function getGoods(goods) {
  return Array.isArray(goods) ? goods.filter((good) => Boolean(getBrand(good?.brand))) : []
}

function getBrandNames(goods) {
  return [...new Set(goods.map((good) => getBrand(good.brand)))]
}

function getList(goods, hasAnalogues) {
  const items = hasAnalogues
    ? goods.flatMap((good) => [good, ...(Array.isArray(good?.analogues) ? good.analogues : [])])
    : goods
  const seenGoodsIds = new Set()

  return items
    .filter((good) => Boolean(getBrand(good?.brand)))
    .map(normalizeGood)
    .filter((good) => {
      if (!good.goodsID) {
        return true
      }

      if (seenGoodsIds.has(good.goodsID)) {
        return false
      }

      seenGoodsIds.add(good.goodsID)

      return true
    })
}

export const fetchParts = createAsyncThunk(
  'parts/fetchParts',
  async ({ number, brand, key, hasAnalogues = false }, { rejectWithValue }) => {
    const normalizedNumber = number.trim()
    const normalizedBrand = brand?.trim() ?? ''
    const search = new URLSearchParams({ key, number: normalizedNumber })

    if (normalizedBrand) {
      search.set('brand', normalizedBrand)
    }

    if (hasAnalogues) {
      search.set('analogues', 'on')
    }

    try {
      const data = await api.get(`${endpoints.HS_PRICE}?${search}`)
      const goods = getGoods(data?.goods)

      return {
        number: normalizedNumber,
        brand: normalizedBrand,
        hasAnalogues: Boolean(hasAnalogues),
        list: getList(goods, hasAnalogues),
        brandNameList: getBrandNames(goods),
      }
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : defaultErrorMessage)
    }
  },
  {
    condition: ({ number }) => Boolean(number?.trim()),
  },
)

const partsSlice = createSlice({
  name: 'parts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchParts.pending, (state, action) => {
        state.status = 'pending'
        state.error = null
        state.list = []
        state.brandNameList = []
        state.requestedNumber = action.meta.arg.number.trim()
        state.requestedBrand = action.meta.arg.brand?.trim() ?? ''
        state.requestedHasAnalogues = Boolean(action.meta.arg.hasAnalogues)
      })
      .addCase(fetchParts.fulfilled, (state, action) => {
        if (
          state.requestedNumber !== action.payload.number ||
          state.requestedBrand !== action.payload.brand ||
          state.requestedHasAnalogues !== action.payload.hasAnalogues
        ) {
          return
        }

        state.status = 'succeeded'
        state.list = action.payload.list
        state.brandNameList = action.payload.brandNameList
      })
      .addCase(fetchParts.rejected, (state, action) => {
        const number = action.meta.arg.number?.trim() ?? ''
        const brand = action.meta.arg.brand?.trim() ?? ''
        const hasAnalogues = Boolean(action.meta.arg.hasAnalogues)

        if (
          state.requestedNumber !== number ||
          state.requestedBrand !== brand ||
          state.requestedHasAnalogues !== hasAnalogues
        ) {
          return
        }

        state.status = 'failed'
        state.list = []
        state.brandNameList = []
        state.error = action.payload ?? action.error.message ?? defaultErrorMessage
      })
  },
})

export const selectParts = (state) => state.parts
export const partsReducer = partsSlice.reducer
