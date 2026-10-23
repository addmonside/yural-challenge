import { describe, expect, it } from 'vite-plus/test'
import { appConfig } from '@/shared/model/app-config'
import { handleUrl } from './handle-url'

describe('handleUrl', () => {
  it('builds a relative API url and does not require auth', () => {
    const result = handleUrl('/hsprice/?key=key&number=01089')

    expect(result).toEqual({
      url: `${appConfig.API_BASE_URL}/hsprice/?key=key&number=01089`,
      needAuth: false,
    })
  })
})
