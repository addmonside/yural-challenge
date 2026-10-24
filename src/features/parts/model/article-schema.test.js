import { describe, expect, it } from 'vite-plus/test'
import { isValidArticle } from './article-schema'

describe('isValidArticle', () => {
  it('accepts letters, digits and separators from 2 to 24 characters', () => {
    expect(isValidArticle('12')).toBe(true)
    expect(isValidArticle('7160500039')).toBe(true)
    expect(isValidArticle('7160500039S')).toBe(true)
    expect(isValidArticle('7160500039/S')).toBe(true)
    expect(isValidArticle('01-89')).toBe(true)
    expect(isValidArticle('CETA009')).toBe(true)
    expect(isValidArticle('1'.repeat(24))).toBe(true)
  })

  it('rejects values that are too short or too long', () => {
    expect(isValidArticle('')).toBe(false)
    expect(isValidArticle('1')).toBe(false)
    expect(isValidArticle('1'.repeat(25))).toBe(false)
  })

  it('rejects values with spaces or unsupported characters', () => {
    expect(isValidArticle('12 34')).toBe(false)
    expect(isValidArticle('12@34')).toBe(false)
  })
})
