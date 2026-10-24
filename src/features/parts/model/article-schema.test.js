import { describe, expect, it } from 'vite-plus/test'
import { isValidArticle } from './article-schema'

describe('isValidArticle', () => {
  it('accepts a numeric article from 2 to 24 characters', () => {
    expect(isValidArticle('12')).toBe(true)
    expect(isValidArticle('7160500039')).toBe(true)
    expect(isValidArticle('1'.repeat(24))).toBe(true)
  })

  it('rejects values that are too short, too long or not numeric', () => {
    expect(isValidArticle('')).toBe(false)
    expect(isValidArticle('1')).toBe(false)
    expect(isValidArticle('1'.repeat(25))).toBe(false)
    expect(isValidArticle('7160500039S')).toBe(false)
    expect(isValidArticle('12 34')).toBe(false)
  })
})
