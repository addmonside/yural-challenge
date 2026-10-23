import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAccount } from '@/services/account/use-account'
import { fetchParts, selectParts } from './parts-slice'

export function useParts(number, brand, hasAnalogues = false) {
  const dispatch = useDispatch()
  const { id: key } = useAccount()
  const {
    list,
    brandNameList,
    status,
    error,
    requestedNumber,
    requestedBrand,
    requestedHasAnalogues,
  } = useSelector(selectParts)
  const normalizedNumber = number?.trim() ?? ''
  const normalizedBrand = brand?.trim() ?? ''

  useEffect(() => {
    if (!normalizedNumber) {
      return
    }

    dispatch(fetchParts({ number: normalizedNumber, brand: normalizedBrand, key, hasAnalogues }))
  }, [dispatch, key, normalizedNumber, normalizedBrand, hasAnalogues])

  const refetch = useCallback(() => {
    if (!normalizedNumber) {
      return
    }

    dispatch(fetchParts({ number: normalizedNumber, brand: normalizedBrand, key, hasAnalogues }))
  }, [dispatch, key, normalizedNumber, normalizedBrand, hasAnalogues])

  const isCurrentRequest =
    requestedNumber === normalizedNumber &&
    requestedBrand === normalizedBrand &&
    requestedHasAnalogues === hasAnalogues

  return {
    list: isCurrentRequest ? list : [],
    brandNameList: isCurrentRequest ? brandNameList : [],
    isPending: Boolean(normalizedNumber) && (status === 'pending' || !isCurrentRequest),
    error: isCurrentRequest ? error : null,
    refetch,
  }
}
