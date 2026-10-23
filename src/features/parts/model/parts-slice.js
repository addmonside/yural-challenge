import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '@/shared/api/api'
import { endpoints } from '@/shared/model/endpoints'
import { apiMessages } from '@/shared/model/errors/messages'

const initialState = {
  list: [],
  brandNameList: [],
  status: 'idle',
  error: null,
  requestedNumber: '',
  requestedBrand: '',
  requestedHasAnalogues: false,
}

function getGoods(goods) {
  return Array.isArray(goods) ? goods.filter((good) => Boolean(good?.brand?.trim())) : []
}

function getBrandNames(list) {
  return [...new Set(list.map((good) => good.brand.trim()))]
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

      if (data?.error) {
        return rejectWithValue(data.error)
      }

      return {
        number: normalizedNumber,
        brand: normalizedBrand,
        hasAnalogues: Boolean(hasAnalogues),
        list: getGoods(data?.goods),
      }
    } catch (error) {
      return rejectWithValue(error.message)
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
        state.brandNameList = getBrandNames(action.payload.list)
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
        state.error = action.payload ?? action.error.message ?? apiMessages.INTERNAL_ERROR
      })
  },
})

export const selectParts = (state) => state.parts
export const partsReducer = partsSlice.reducer
